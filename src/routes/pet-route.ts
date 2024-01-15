import express from "express";
const petRouter = express.Router();
import * as petController from '../controller/pet-controller';

petRouter.get('/getAll', petController.getPets);
petRouter.post('/add', petController.addPet);
petRouter.put('/update/:id', petController.updatePet);
petRouter.get('/getById/:id', petController.getPetById);
petRouter.delete('/delete/:id', petController.deletePet);

export default petRouter;