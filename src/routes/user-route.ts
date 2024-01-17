// import express from "express";
// const userRouter = express.Router();
// import * as userController from '../controller/user-controller'
//
// // userRouter.get('/getAll', userController.getUsers);
// // userRouter.post('/add', userController.addUser);
// // userRouter.put('/update/:username', userController.updateUser);
// // userRouter.get('/getById/:username', userController.getUserById);
// // userRouter.delete('/delete/:username', userController.deleteUser);
// // userRouter.get('/getRole/:role', userController.getUserByRole);
// // userRouter.get('/login', userController.checkLogin);
//
//
//
// export default userRouter;

import express from "express";
import { register, login } from "../controller/user-controller";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
