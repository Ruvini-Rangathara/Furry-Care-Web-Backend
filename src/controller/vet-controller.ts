import {Request, Response} from "express";
import Vet from "../model/vet-model";

export const getVets = async (req: Request, res: Response) => {
    try {
        const vets = await Vet.find();
        res.json(vets);
        console.log("Vets:", vets.toString());
    } catch (err) {
        res.status(500).json({message: 'Error while getting vets'});
        console.error('Error while getting vets:', err);
    }
};

export const addVet = async (req: Request, res: Response) => {
    try {
        const { id, name, gender, nic, location, email, contact, qualification, username, imageUrl } = req.body;

        const vet = new Vet({
            id,
            name,
            gender,
            nic,
            location,
            email,
            contact,
            qualification,
            imageUrl,
            username,
        });

        const savedVet = await vet.save();
        console.log("Vet saved!");
        res.json(savedVet);
    } catch (err) {
        res.status(500).json({ message: 'Unable to save vet.' });
        console.error('Error while saving vet:', err);
    }
};


export const updateVet = async (req: Request, res: Response) => {
    try {
        const { id, name, gender, nic, location, email, contact, qualification, username,imageUrl } = req.body;
        const vet = await Vet.updateOne(
            {id: req.params.id},
            {
                $set: {
                    id,
                    name,
                    gender,
                    nic,
                    location,
                    email,
                    contact,
                    qualification,
                    imageUrl,
                    username,
                }
            }
        );
        console.log("Vet updated!");
        res.json(vet);
    } catch (err) {
        res.status(500).json({ message: 'Unable to update vet.' });
        console.error('Error while updating vet:', err);
    }
};


export const deleteVet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedVet = await Vet.findOneAndDelete({ id });
        if (!deletedVet) {
            return res.status(404).json({ message: 'Vet not found.' });
        }

        console.log("Vet deleted!");
        res.json(deletedVet);
    } catch (err) {
        res.status(500).json({ message: 'Unable to delete vet.' });
        console.error('Error while deleting vet:', err);
    }
};

export const getVetById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const vet = await Vet.findOne({ id });

        if (!vet) {
            return res.status(404).json({ message: 'Vet not found.' });
        }

        res.json(vet);
    } catch (err) {
        res.status(500).json({ message: 'Error while fetching vet.' });
        console.error('Error while fetching vet:', err);
    }
};

export const getCount = async (req: Request, res: Response) => {
    try {
        const count = await Vet.countDocuments({});
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: 'Error while counting vets.' });
        console.error('Error while counting vets:', err);
    }
};



export const getNewId = async (req: Request, res: Response) => {
    try {
        const vets = await Vet.find().sort({id: -1});
        let newId = "";
        if (vets.length === 0) {
            newId = "V-0001";
        } else {
            const lastId = vets[0].id;
            const lastIdNumber = parseInt(lastId.substring(2, 6));
            newId = "V-" + (lastIdNumber + 1).toString().padStart(4, "0");
        }
        res.json(newId);
        console.log("new id for vet: ", newId);
    } catch (err) {
        res.status(500).json({message: 'Error while getting new id for vet'});
        console.error('Error while getting new id for vet:', err);
    }
}