import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { eventRoutes } from "./event.routes.js";
import { categoryRoutes } from "./category.routes.js";

export const routes = Router();

routes.use(userRoutes);
routes.use(eventRoutes);
routes.use(categoryRoutes);
