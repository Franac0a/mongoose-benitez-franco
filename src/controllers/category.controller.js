import { CategoryModel } from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creando categoría", error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo categorías", error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updated = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando categoría", error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);
    if (!category)
      return res.status(404).json({ message: "Categoría no encontrada" });

    category.active = false;
    await category.save();

    // Desactivar eventos que usan esta categoría
    await EventModel.updateMany(
      { category: category._id },
      { $set: { active: false } }
    );

    res.status(200).json({ message: "Categoría desactivada con cascada" });
  } catch (error) {
    res.status(500).json({ message: "Error al desactivar categoría", error });
  }
};
