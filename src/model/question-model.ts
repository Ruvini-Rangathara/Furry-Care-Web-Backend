import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./user-model";

interface QuestionDocument extends Document {
    id: string;
    question: string;
    date: Date;
    username: string;
}

interface QuestionModel extends Model<QuestionDocument> {}

const questionSchema = new Schema<QuestionDocument, QuestionModel>({
    id: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    date: { type: Date, required: true },
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

const Question = mongoose.model<QuestionDocument, QuestionModel>('Question', questionSchema);

export default Question;
