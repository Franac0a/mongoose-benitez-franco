import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";

export const createUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ active: true }).populate("events");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.id,
      active: true,
    }).populate("events");

    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o inactivo" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener usuario", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    user.active = false;
    await user.save();

    // Desactivar eventos organizados por el usuario
    await EventModel.updateMany(
      { organizer: user._id },
      { $set: { active: false } }
    );

    // Eliminar al usuario del array de asistentes
    await EventModel.updateMany(
      { attendees: user._id },
      { $pull: { attendees: user._id } }
    );

    res.status(200).json({ message: "Usuario desactivado con cascada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al desactivar usuario", error });
  }
};
