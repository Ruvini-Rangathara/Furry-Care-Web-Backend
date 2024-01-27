// user-model.ts
import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
    username: string;
    password: string;
    role: string;
    activeState: boolean;
}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    activeState: { type: Boolean, required: true },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
