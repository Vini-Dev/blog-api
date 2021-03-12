import { Document, model, Schema } from 'mongoose';

export interface UserDataInterface extends Document {
  name: string;
  user: string;
  password: string;
  created_at: string;
  updated_at: string;
}

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
})

export default model<UserDataInterface>('Users', UsersSchema)