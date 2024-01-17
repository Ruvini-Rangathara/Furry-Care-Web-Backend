import {Request, Response} from "express";
import Pet from "../model/pet-model";

export const getPets = async (req: Request, res: Response) => {
    try {
        const pets = await Pet.find().sort({name: 1});
        res.json(pets);
        console.log("Pets:", pets.toString());
    } catch (err) {
        res.status(500).json({message: 'Error while getting pets'});
        console.error('Error while getting pets:', err);
    }
};

export const addPet = async (req: Request, res: Response) => {
    const pet = new Pet({
        id: req.body.id,
        petType: req.body.petType,
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        colors: req.body.colors,
        ownershipStatus: req.body.ownershipStatus,
        injuredStatus: req.body.injuredStatus,
        username: req.body.username,
    });

    try {
        const savedPet = await pet.save();
        console.log("save pet!")
        res.json(savedPet);
    } catch (err) {
        res.json({message: err});
        console.log("can not save pet! ", err)
    }
}

export const updatePet = async (req: Request, res: Response) => {
    try {
        const updatedPet = await Pet.updateOne(
            {id: req.params.id},
            {
                $set: {
                    id: req.body.id,
                    petType: req.body.petType,
                    name: req.body.name,
                    age: req.body.age,
                    breed: req.body.breed,
                    colors: req.body.colors,
                    ownershipStatus: req.body.ownershipStatus,
                    injuredStatus: req.body.injuredStatus,
                    username: req.body.username,
                }
            }
        );
        res.json(updatedPet);
        console.log("update pet!")
    } catch (err) {
        res.json({message: err});
        console.log("error while updating pet : ", err)
    }

}

export const deletePet = async (req: Request, res: Response) => {
    try {
        const deletedPet = await Pet.deleteOne({id: req.params.id});
        res.json(deletedPet);
        console.log("delete pet!")
    } catch (err) {
        res.json({message: err});
        console.log("error while deleting pet : ", err)
    }

}

export const getPetById = async (req: Request, res: Response) => {
    const petId = req.params.id;

    try {
        const pet = await Pet.findOne({ id: petId });
        res.json(pet);
        console.log("Pet get ");
    } catch (err) {
        res.status(500).json({ message: 'Error while getting pet' });
        console.error('Error while getting pet:', err);
    }
}

export const getNewId = async (req: Request, res: Response) => {
    try {
        const pets = await Pet.find().sort({id: -1});
        let newId = "";
        if (pets.length === 0) {
            newId = "P-0001";
        } else {
            const lastId = pets[0].id;
            const lastIdNumber = parseInt(lastId.substring(2, 6));
            newId = "P-" + (lastIdNumber + 1).toString().padStart(4, "0");
        }
        res.json(newId);
        console.log("new id for pet: ", newId);
    } catch (err) {
        res.status(500).json({message: 'Error while getting new id for pet'});
        console.error('Error while getting new id for pet:', err);
    }
}