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
    const deleted = await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Categoría eliminada", category: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando categoría", error });
  }
};
