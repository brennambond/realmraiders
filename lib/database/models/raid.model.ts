import { Schema, model, models } from "mongoose";

export interface IRaid extends Document {
  _id: string;
  title: string;
  description?: string;
  environment?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFeatured: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const RaidSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  environment: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFeatured: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Raid = models.Raid || model("Raid", RaidSchema);

export default Raid;
