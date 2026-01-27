import { Schema, model } from 'mongoose';
import { HashService } from '../services/bcrypt.services';

const hash = new HashService();

const UserSchema = new Schema(
  {
    uuid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash.hash(this.password);
  }
});

export const UserModel = model('User', UserSchema);
