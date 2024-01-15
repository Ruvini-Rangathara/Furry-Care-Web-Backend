import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./user-model";

interface DonationDocument extends Document {
    id: string;
    description: string;
    location: string;
    date: Date;
    receiver: string;
    donor: string;
    username: string;
}

interface DonationModel extends Model<DonationDocument> {}

const donationSchema = new Schema<DonationDocument, DonationModel>({
    id: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    receiver: { type: String, required: true },
    donor: { type: String, required: true },
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

const Donation = mongoose.model<DonationDocument, DonationModel>('Donation', donationSchema);

export default Donation;
