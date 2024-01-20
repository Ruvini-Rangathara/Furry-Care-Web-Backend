import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./user-model";

interface PetDocument extends Document {
    id: string;
    petType: string;
    name: string;
    age: number;
    breed: string;
    colors: string;
    ownershipStatus: string;
    injuredStatus: string;
    imageUrl: string;
    username: string;
}

interface PetModel extends Model<PetDocument> {}

const petSchema = new Schema<PetDocument, PetModel>({
    id: { type: String, required: true, unique: true },
    petType: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true },
    colors: { type: String, required: true },
    ownershipStatus: { type: String ,required: true},
    injuredStatus: { type: String, required: true },
    imageUrl: { type: String, default: undefined },
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

const Pet = mongoose.model<PetDocument, PetModel>('Pet', petSchema);

export default Pet;