import mongoose, {Document, Model, Schema} from "mongoose";
import User from "./user-model";
import Question from "./question-model";

interface AnswerDocument extends Document {
    id: string;
    qid: string;
    answer: string;
    like: number;
    unlike: number;
    username: string;
}

interface AnswerModel extends Model<AnswerDocument> {
}

const answerSchema = new Schema<AnswerDocument, AnswerModel>({
    id: {type: String, required: true, unique: true},
    qid: {
        type: String, required: true, validate: {
            validator: async (value: string) => {
                const user = await Question.findOne({id: value});
                return user !== null;
            }, message: (props: { value: string }) => `Question with id '${props.value}' does not exist.`,
        },
    },
    answer: {type: String, required: true},
    like: {type: Number, default: 0},
    unlike: {type: Number, default: 0},
    username: {
        type: String, required: true, validate: {
            validator: async (value: string) => {
                const user = await User.findOne({username: value});
                return user !== null;
            }, message: (props: { value: string }) => `User with username '${props.value}' does not exist.`,
        },
    },
});

const Answer = mongoose.model<AnswerDocument, AnswerModel>('Answer', answerSchema);

export default Answer;
