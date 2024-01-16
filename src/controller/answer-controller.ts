import {Request, Response} from "express";
import Answer from "../model/answer-model";

//get answers by question id
export const getAnswersByQuestionId = async (req: Request, res: Response) => {
    try {
        const answers = await Answer.find({qid: req.params.qid});
        res.json(answers);
        console.log("Answers:", answers.toString());
    } catch (err) {
        res.status(500).json({message: 'Error while getting answers'});
        console.error('Error while getting answers:', err);
    }
}

export const addAnswer = async (req: Request, res: Response) => {
    const answer = new Answer({
        id: req.body.id,
        qid: req.body.qid,
        answer: req.body.answer,
        like: 0,
        unlike: 0,
        username: req.body.username,
    });

    try {
        const savedAnswer = await answer.save();
        console.log("save answer!")
        res.json(savedAnswer);
    } catch (err) {
        res.json({message: err});
        console.log("can not save answer! ", err)
    }
}

export const deleteAnswer = async (req: Request, res: Response) => {
    try {
        const deletedAnswer = await Answer.deleteOne({id: req.params.id});
        res.json(deletedAnswer);
        console.log("delete answer!")
    } catch (err) {
        res.json({message: err});
        console.log("error while deleting answer : ", err)
    }
}

//increase like by one answer
export const increaseLike = async (req: Request, res: Response) => {
    try {

        //get like count from answer
        const answer = await Answer.findOne({id: req.params.id});
        let likeCount:number = 0;

        if(answer != null){
            likeCount = answer.like;
        }
        let updateLikes = (1+likeCount)

        const updatedAnswer = await Answer.updateOne(
            {id: req.params.id},
            {
                $inc: {
                    like: updateLikes
                }
            }
        );
        res.json(updatedAnswer);
        console.log("update answer!")
    } catch (err) {
        res.json({message: err});
        console.log("error while updating answer : ", err)
    }
}


//increase unlike by one answer
export const increaseUnlike = async (req: Request, res: Response) => {
    try {

        //get like count from answer
        const answer = await Answer.findOne({id: req.params.id});
        let unlikeCount:number = 0;
        if (answer != null) {
            unlikeCount = answer.unlike;
        }
        let updateUnlikes = (1 + unlikeCount)

        const updatedAnswer = await Answer.updateOne(
            {id: req.params.id},
            {
                $inc: {
                    unlike: updateUnlikes
                }
            }
        );
        res.json(updatedAnswer);
        console.log("update answer!")
    } catch (err) {
        res.json({message: err});
        console.log("error while updating answer : ", err)
    }
}

export const getNewId = async (req: Request, res: Response) => {
    try {
        const answers = await Answer.find();
        let maxId = 0;
        answers.forEach((answer) => {
            let id = parseInt(answer.id.split("-")[1]);
            if (id > maxId) {
                maxId = id;
            }
        })
        let newId = "A-" + (maxId + 1).toString().padStart(4, '0');
        res.json(newId);
        console.log("New answer id:", newId);
    } catch (err) {
        res.status(500).json({message: 'Error while getting new answer id'});
        console.error('Error while getting new answer id:', err);
    }
}