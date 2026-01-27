import { Schema, model } from 'mongoose';

const ModelSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
  },
  { timestamps: true },
);

export const ModelModel = model('Model', ModelSchema);
