import { Router } from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.post("/users", createUser);
userRoutes.get("/users", getUsers);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
