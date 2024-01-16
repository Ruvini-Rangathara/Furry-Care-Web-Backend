import express from "express";
const complaintRouter = express.Router();
import * as complaintController from '../controller/complaint-controller';

complaintRouter.get('/getAll', complaintController.getComplaints);
complaintRouter.post('/add', complaintController.addComplaint);
complaintRouter.put('/update/:id', complaintController.updateComplaint);
complaintRouter.get('/getById/:id', complaintController.getComplaintById);
complaintRouter.delete('/delete/:id', complaintController.deleteComplaint);
complaintRouter.get('/getNewId', complaintController.getNewId);

export default complaintRouter;