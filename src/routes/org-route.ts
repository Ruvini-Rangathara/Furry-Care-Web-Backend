import express from "express";
import * as orgController from '../controller/org-controller';

const orgRouter = express.Router();

orgRouter.get('/getAll', orgController.getOrgs);
orgRouter.post('/add', orgController.addOrg);

orgRouter.put('/update/:id', orgController.updateOrg);
orgRouter.delete('/delete/:id', orgController.deleteOrg);
orgRouter.get('/getById/:id', orgController.getOrgById);
orgRouter.get('/count', orgController.getOrgCount);

export default orgRouter;