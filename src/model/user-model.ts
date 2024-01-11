import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: Number,
    role: String,
    name: String,
    email: String,
    location: String,
    contact: String,

});

const User = mongoose.model('User', userSchema);

export default User;