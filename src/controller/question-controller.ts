import {Request, Response} from "express";
import Question from "../model/question-model";

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find().sort({date: -1});
        res.json(questions);
        console.log("Questions:", questions.toString());
    } catch (err) {
        res.status(500).json({message: 'Error while getting questions'});
        console.error('Error while getting questions:', err);
    }
}

export const addQuestion = async (req: Request, res: Response) => {
    const question = new Question({
        id: req.body.id,
        question: req.body.question,
        date: req.body.date,
        username: req.body.username,
    });

    try {
        const savedQuestion = await question.save();
        console.log("save question!")
        res.json(savedQuestion);
    } catch (err) {
        res.json({message: err});
        console.log("can not save question! ", err)
    }
}

export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const deletedQuestion = await Question.deleteOne({id: req.params.id});
        res.json(deletedQuestion);
        console.log("delete question!")
    } catch (err) {
        res.json({message: err});
        console.log("error while deleting question : ", err)
    }
}

export const getQuestionById = async (req: Request, res: Response) => {
    try{
        const question = await Question.findOne({id: req.params.id});
        res.json(question);
        console.log("get question by id!")
    }catch (err) {
        res.json({message: err});
        console.log("error while getting question by id : ", err)
    }
}

export const getNewId = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find().sort({id: -1});
        let newId = "";
        if (questions.length === 0) {
            newId = "Q-0001";
        } else {
            const lastId = questions[0].id;
            const lastIdNumber = parseInt(lastId.substring(2, 6));
            newId = "Q-" + (lastIdNumber + 1).toString().padStart(4, "0");
        }
        res.json(newId);
        console.log("new id for question: ", newId);
    } catch (err) {
        res.status(500).json({message: 'Error while getting new id for question'});
        console.error('Error while getting new id for question:', err);
    }
}