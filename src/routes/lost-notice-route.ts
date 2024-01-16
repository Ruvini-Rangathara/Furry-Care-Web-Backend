import express from "express";
const lostNoticeRouter = express.Router();
import * as lostNoticeController from '../controller/lost-notice-controller';

lostNoticeRouter.get('/getAll', lostNoticeController.getLostNotices);
lostNoticeRouter.post('/add', lostNoticeController.addLostNotice);
lostNoticeRouter.put('/update/:id', lostNoticeController.updateLostNotice);
lostNoticeRouter.delete('/delete/:id', lostNoticeController.deleteLostNotice);
lostNoticeRouter.get('/getById/:id', lostNoticeController.getLostNoticeById);


export default lostNoticeRouter;