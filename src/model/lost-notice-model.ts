import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./user-model";

interface LostNoticeDocument extends Document {
    id: string;
    location: string;
    date: Date;
    time: string;
    description: string;
    status: string;
    username: string;
}

interface LostNoticeModel extends Model<LostNoticeDocument> {}

const lostNoticeSchema = new Schema<LostNoticeDocument, LostNoticeModel>({
    id: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
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

const LostNotice = mongoose.model<LostNoticeDocument, LostNoticeModel>('LostNotice', lostNoticeSchema);

export default LostNotice;
