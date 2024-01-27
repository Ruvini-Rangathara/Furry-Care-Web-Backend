import express from "express";
const userRouter = express.Router();
import * as userController from '../controller/user-controller'

userRouter.get('/getAll', userController.getUsers);
userRouter.post('/add', userController.addUser);
userRouter.post('/login', userController.login);
userRouter.get('/getByUsername/:username', userController.getUserByUsername);

export default userRouter;
