import { Schema, model } from "mongoose";

const locationSchema = new Schema(
  {
    city: String,
    address: String,
    date: Date,
  },
  { _id: false }
);

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: locationSchema,
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    active: { type: Boolean, default: true },
  },
  { versionKey: false }
);

export const EventModel = model("Event", eventSchema);
