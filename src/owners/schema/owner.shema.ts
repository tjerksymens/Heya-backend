import * as mongoose from 'mongoose';

export const OwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
});