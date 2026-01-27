import { Schema, model } from 'mongoose';

const BrandSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const BrandModel = model('Brand', BrandSchema);
