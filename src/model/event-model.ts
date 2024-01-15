// event-model.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./user-model";

interface EventDocument extends Document {
    id: string;
    title: string;
    location: string;
    date: Date;
    time: string;
    description: string;
    username: string;
}

interface EventModel extends Model<EventDocument> {}

const eventSchema = new Schema<EventDocument, EventModel>({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
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

const Event = mongoose.model<EventDocument, EventModel>('Event', eventSchema);

export default Event;
