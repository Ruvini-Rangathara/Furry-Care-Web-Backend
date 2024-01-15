import mongoose from "mongoose";
import User from "./user-model";

interface VetDocument extends mongoose.Document {
    id: string;
    name: string;
    gender: string;
    nic: string;
    location: string;
    email: string;
    contact: string;
    qualification: string;
    username: string;
}

interface VetModel extends mongoose.Model<VetDocument> {}

const vetSchema = new mongoose.Schema<VetDocument, VetModel>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    nic: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    qualification: { type: String, required: true },
    username: {
        type: String,
        required: true,
        validate: {
            validator: async (value: string) => {
                const user = await User.findOne({ username: value });
                return user !== null;
            },
            message: (props: { value: string }) => `User with username '${props.value}' does not exist.`,
        },
    },
});

const Vet = mongoose.model<VetDocument, VetModel>('Vet', vetSchema);

export default Vet;