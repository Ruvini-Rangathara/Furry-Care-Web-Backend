import express from "express";
const answerRouter = express.Router();
import * as answerController from '../controller/answer-controller';

answerRouter.get('/getAll/:qid', answerController.getAnswersByQuestionId);
answerRouter.post('/add', answerController.addAnswer);
answerRouter.delete('/delete/:id', answerController.deleteAnswer);
answerRouter.put('/increaseLike/:id', answerController.increaseLike);
answerRouter.put('/increaseUnlike/:id', answerController.increaseUnlike);
answerRouter.get('/getNewId', answerController.getNewId);

export default answerRouter;