import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
    age: Number,
    interests: [String],
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: profileSchema,
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
