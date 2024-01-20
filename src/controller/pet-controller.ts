import { Request, Response } from "express";
import Pet from "../model/pet-model";
import { WriteError } from "mongodb";

export const getPets = async (req: Request, res: Response) => {
    try {
        const pets = await Pet.find().sort({ name: 1 });
        res.json(pets);
        console.log("Pets:", pets.toString());
    } catch (err) {
        res.status(500).json({ message: 'Error while getting pets' });
        console.error('Error while getting pets:', err);
    }
};

export const addPet = async (req: Request, res: Response) => {
    console.log("add pet! in backend");
    console.log("image url : ", req.body.imageUrl)

    const pet = new Pet({
        id: req.body.id,
        petType: req.body.petType,
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        colors: req.body.colors,
        ownershipStatus: req.body.ownershipStatus,
        injuredStatus: req.body.injuredStatus,
        imageUrl: req.body.imageUrl,
        username: req.body.username,
    });
    console.log(pet.imageUrl)

    console.log("-----------------------------------------------------------------------------------------------------")
    console.log("pet in backend : ", JSON.stringify(pet));
    console.log("-----------------------------------------------------------------------------------------------------")
    try {
        const savedPet = await pet.save();
        console.log("save pet!")
        res.json(savedPet);
        res.end();
    } catch (err: any) {
        if (err.code === 11000 || err.keyPattern) {
            // Handle MongoDB duplicate key error
            console.log("Duplicate key error: Pet with the same ID already exists.");
            res.status(409).json({ message: "Pet with the same ID already exists." });
        } else {
            console.log("Cannot save pet! ", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export const updatePet = async (req: Request, res: Response) => {
    console.log("update pet! in backend");

    try {
        // Check if the pet exists
        const existingPet = await Pet.findOne({ id: req.params.id });

        if (!existingPet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // Update the pet
        const updatedPet = await Pet.updateOne(
            { id: req.params.id },
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
                    imageUrl: req.body.imageUrl,
                    username: req.body.username,
                },
            }
        );

        res.json(updatedPet);
        console.log("update pet!");
    } catch (err: any) { // Explicitly assert the type of 'err' as 'any'
        res.status(500).json({ message: (err as Error).message || "Internal Server Error" });
        console.log("error while updating pet: ", err);
    }
};

export const deletePet = async (req: Request, res: Response) => {
    try {
        // Check if the pet exists
        const existingPet = await Pet.findOne({ id: req.params.id });

        if (!existingPet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // Delete the pet
        const deletedPet = await Pet.deleteOne({ id: req.params.id });

        res.json(deletedPet);
        console.log("delete pet!");
    } catch (err: any) { // Explicitly assert the type of 'err' as 'any'
        res.status(500).json({ message: (err as Error).message || "Internal Server Error" });
        console.log("error while deleting pet: ", err);
    }
};

export const getPetById = async (req: Request, res: Response) => {
    console.log("get pet by id! in backend : ", req.params.id);
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
        const pets = await Pet.find().sort({ id: -1 });
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
        res.status(500).json({ message: 'Error while getting new id for pet' });
        console.error('Error while getting new id for pet:', err);
    }
}