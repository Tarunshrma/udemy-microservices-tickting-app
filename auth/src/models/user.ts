//import mongoose from 'mongoose'
import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface User {
    username: string;
    password: string;
  }

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
  });

// 3. Create a Model.
const User = model<User>('User', schema);  

export { User }; 