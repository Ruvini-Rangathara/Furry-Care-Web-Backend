import express from "express";
const userRouter = express.Router();
import * as userController from '../controller/user-controller'


userRouter.get('/getAll', userController.getUsers);
userRouter.post('/add', userController.addUser);
userRouter.put('/update/:username', userController.updateUser);
userRouter.get('/getById/:username', userController.getUserById);
userRouter.delete('/delete/:username', userController.deleteUser);
userRouter.get('/getByRole/:role', userController.getUserByRole);


export default userRouter