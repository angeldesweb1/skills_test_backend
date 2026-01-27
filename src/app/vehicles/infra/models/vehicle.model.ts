import { Schema, model } from 'mongoose';

export const VehicleSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    year: { type: String, required: true },
    status: { type: String, enum: ['disponible', 'mantenimiento', 'servicio'] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export const VehicleModel = model('Vehicle', VehicleSchema);
