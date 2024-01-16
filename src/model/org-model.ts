import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./user-model";

interface OrgDocument extends Document {
    id: string;
    name: string;
    contact: string;
    email: string;
    location: string;
    description: string;
    username: string;
}

interface OrgModel extends Model<OrgDocument> {}

const orgSchema = new Schema<OrgDocument, OrgModel>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
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

const Org = mongoose.model<OrgDocument, OrgModel>('Org', orgSchema);

export default Org;
