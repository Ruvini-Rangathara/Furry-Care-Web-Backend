import express from "express";
const eventRouter = express.Router();
import * as eventController from '../controller/event-controller';

eventRouter.get('/getAll', eventController.getEvents);
eventRouter.post('/add', eventController.addEvent);
eventRouter.put('/update/:id', eventController.updateEvent);
eventRouter.get('/getById/:id', eventController.getEventById);
eventRouter.delete('/delete/:id', eventController.deleteEvent);

export default eventRouter;