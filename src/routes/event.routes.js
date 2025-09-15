import { Router } from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventById,
} from "../controllers/event.controller.js";
import { addAttendee } from "../controllers/event.controller.js";
import { removeAttendee } from "../controllers/event.controller.js";

export const eventRoutes = Router();

eventRoutes.post("/events", createEvent);
eventRoutes.get("/events", getEvents);
eventRoutes.get("/events/:id", getEventById);
eventRoutes.put("/events/:id", updateEvent);
eventRoutes.delete("/events/:id", deleteEvent);
eventRoutes.put("/events/:eventId/attendees/:userId", addAttendee);
eventRoutes.delete("/events/:eventId/attendees/:userId", removeAttendee);
