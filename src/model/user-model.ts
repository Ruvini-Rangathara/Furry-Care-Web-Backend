// user-model.ts
import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
    username: string;
    password: string;
    role: string;
    name: string;
    email: string;
    location: string;
    contact: string;
}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
