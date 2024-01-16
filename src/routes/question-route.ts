import express from "express";
const questionRouter = express.Router();
import * as questionController from '../controller/question-controller';

questionRouter.get('/getAll', questionController.getQuestions);
questionRouter.post('/add', questionController.addQuestion);
questionRouter.delete('/delete/:id', questionController.deleteQuestion);
questionRouter.get('/getById/:id', questionController.getQuestionById);

export default questionRouter;