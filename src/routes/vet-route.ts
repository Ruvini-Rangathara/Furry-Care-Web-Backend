import express from "express";
const vetRouter = express.Router();
import * as vetController from '../controller/vet-controller';

vetRouter.get('/getAll', vetController.getVets);
vetRouter.post('/add', vetController.addVet);
vetRouter.put('/update/:id', vetController.updateVet);
vetRouter.delete('/delete/:id', vetController.deleteVet);
vetRouter.get('/getById/:id', vetController.getVetById);
vetRouter.get('/count', vetController.getCount);

export default vetRouter;