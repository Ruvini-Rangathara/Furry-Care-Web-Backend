import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./user-model";

interface ComplaintDocument extends Document {
    id: string;
    date: Date;
    title: string;
    description: string;
    location: string;
    status: string;
    username: string;
}

interface ComplaintModel extends Model<ComplaintDocument> { }

const complaintSchema = new Schema<ComplaintDocument, ComplaintModel>({
    id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
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

const Complaint = mongoose.model<ComplaintDocument, ComplaintModel>('Complaint', complaintSchema);

export default Complaint;
