import express  from "express";
const donationRouter = express.Router();
import * as donationController from '../controller/donation-controller'

donationRouter.get('/getAll', donationController.getDonations);
donationRouter.post('/add', donationController.addDonation);
donationRouter.put('/update/:id', donationController.updateDonation);
donationRouter.get('/getById/:id', donationController.getDonationById);
donationRouter.delete('/delete/:id', donationController.deleteDonation);

export default donationRouter;