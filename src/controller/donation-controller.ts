import {Request,Response} from "express";
import Donation from "../model/donation-model";


export const getDonations = async (req: Request, res: Response) => {
    try {
        const donations = await Donation.find().sort({ date: -1 });
        res.json(donations);
        console.log("Donations:", donations.toString());
    } catch (err) {
        res.status(500).json({ message: 'Error while getting donations' });
        console.error('Error while getting donations:', err);
    }
};

export const addDonation = async (req:Request,res:Response)=>{
    const donation = new Donation({
        id:req.body.id,
        description:req.body.description,
        location:req.body.location,
        date:req.body.date,
        receiver:req.body.receiver,
        donor:req.body.donor,
        username:req.body.username,
    });

    try{
        const savedDonation = await donation.save();
        console.log("save donation!")
        res.json(savedDonation);
    }catch(err){
        res.json({message:err});
        console.log("can not save donation! ",err)
    }
}

export const updateDonation = async (req:Request,res:Response)=>{
    try{
        const updatedDonation = await Donation.updateOne(
            {id:req.params.id},
            {
                $set:{
                    id:req.body.id,
                    description:req.body.description,
                    location:req.body.location,
                    date:req.body.date,
                    receiver:req.body.receiver,
                    donor:req.body.donor,
                    username:req.body.username,
                }
            }
        );
        res.json(updatedDonation);
        console.log("update donation!")
    }catch(err){
        res.json({message:err});
        console.log("error while updating donation : ",err)
    }

}

export const getDonationById = async (req: Request, res: Response) => {
    try {
        const donation = await Donation.findOne({ id: req.params.id });
        if (!donation) {
            console.log("Donation not found");
            return res.status(404).json({ message: 'Donation not found' });
        }
        res.json(donation);
        console.log("Donation:", donation.toString());
    } catch (err) {
        res.status(500).json({ message: 'Error while getting donation by id' });
        console.error('Error while getting donation by id:', err);
    }
};

export const deleteDonation = async (req:Request,res:Response)=>{
    try{
        const removedDonation = await Donation.deleteOne({id:req.params.id});
        res.json(removedDonation);
        console.log("delete donation!")
    }catch(err){
        res.json({message:err});
        console.log("error while deleting donation : ",err)
    }
}

