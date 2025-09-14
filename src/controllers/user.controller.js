import { UserModel } from "../models/user.model.js";

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
    const users = await UserModel.find().populate("events");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
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
    const deleted = await UserModel.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Usuario eliminado lógicamente", user: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};
