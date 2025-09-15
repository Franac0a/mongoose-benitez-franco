import { EventModel } from "../models/event.model.js";
import { UserModel } from "../models/user.model.js";

export const createEvent = async (req, res) => {
  try {
    const event = await EventModel.create(req.body);

    // Actualizar el array de eventos del organizador
    await UserModel.findByIdAndUpdate(event.organizer, {
      $addToSet: { events: event._id }, // evita duplicados
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ active: true })
      .populate("organizer")
      .populate("attendees")
      .populate("category");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener eventos", error });
  }
};
export const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id)
      .populate("organizer")
      .populate("attendees")
      .populate("category");
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener evento", error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await EventModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar evento", error });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deleted = await EventModel.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Evento eliminado lógicamente", event: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar evento", error });
  }
};
export const addAttendee = async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    const event = await EventModel.findById(eventId);
    const user = await UserModel.findById(userId);

    if (!event || !user) {
      return res
        .status(404)
        .json({ message: "Evento o usuario no encontrado" });
    }

    // Evitar duplicados
    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    if (!user.events.includes(eventId)) {
      user.events.push(eventId);
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Usuario agregado como asistente", event, user });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar asistente", error });
  }
};

export const removeAttendee = async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    const event = await EventModel.findById(eventId);
    const user = await UserModel.findById(userId);

    if (!event || !user) {
      return res
        .status(404)
        .json({ message: "Evento o usuario no encontrado" });
    }

    // Remover el userId del array de asistentes
    event.attendees = event.attendees.filter((id) => id.toString() !== userId);
    await event.save();

    // Remover el eventId del array de eventos del usuario
    user.events = user.events.filter((id) => id.toString() !== eventId);
    await user.save();

    res
      .status(200)
      .json({ message: "Usuario removido del evento", event, user });
  } catch (error) {
    res.status(500).json({ message: "Error al remover asistente", error });
  }
};
