import { Document, model, Schema } from 'mongoose';
import { UserDataInterface } from './Users'

interface PostDataInterface extends Document {
  description: string;
  image: string;
  created_at: string;
  created_by: UserDataInterface;
  updated_at: string;
  updated_by: UserDataInterface;
}

const PostsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default model<PostDataInterface>('Posts', PostsSchema)