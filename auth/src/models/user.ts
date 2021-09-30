//import mongoose from 'mongoose'
import { Schema, model } from 'mongoose';
import { Password } from '../services/password'

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

  schema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
  });

// 3. Create a Model.
const User = model<User>('User', schema);  

export { User }; 