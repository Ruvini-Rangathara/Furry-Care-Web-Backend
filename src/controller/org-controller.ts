import {Request, Response} from "express";
import Org from "../model/org-model";


export const getOrgs = async (req: Request, res: Response) => {
    try {
        const orgs = await Org.find().sort({name: 1});
        res.json(orgs);
        console.log("Orgs:", orgs.toString());
    } catch (err) {
        res.status(500).json({message: 'Error while getting orgs'});
        console.error('Error while getting orgs:', err);
    }
}

export const addOrg = async (req: Request, res: Response) => {
    const org = new Org({
        id: req.body.id,
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        location: req.body.location,
        description: req.body.description,
        username: req.body.username,
    });

    try {
        const savedOrg = await org.save();
        console.log("save org!")
        res.json(savedOrg);
    } catch (err) {
        res.json({message: err});
        console.log("can not save org! ", err)
    }
}

export const updateOrg = async (req: Request, res: Response) => {
    try {
        const updatedOrg = await Org.updateOne(
            {id: req.params.id},
            {
                $set: {
                    id: req.body.id,
                    name: req.body.name,
                    contact: req.body.contact,
                    email: req.body.email,
                    location: req.body.location,
                    description: req.body.description,
                    username: req.body.username,
                }
            }
        );
        res.json(updatedOrg);
        console.log("update org!")
    } catch (err) {
        res.json({message: err});
        console.log("error while updating org : ", err)
    }
}

export const deleteOrg = async (req: Request, res: Response) => {
    try {
        const deletedOrg = await Org.deleteOne({id: req.params.id});
        res.json(deletedOrg);
        console.log("delete org!")
    } catch (err) {
        res.json({message: err});
        console.log("error while deleting org : ", err)
    }
}

export const getOrgById = async (req: Request, res: Response) => {
    try {
        const org = await Org.findOne({id: req.params.id});
        res.json(org);
        console.log("get org by id!")
    } catch (err) {
        res.json({message: err});
        console.log("error while getting org by id : ", err)
    }
}

export const getOrgCount = async (req: Request, res: Response) => {
    try {
        const orgCount = await Org.countDocuments({});
        res.json(orgCount);
        console.log("get org count : ", orgCount);
    } catch (err) {
        res.json({ message: err });
        console.error("error while getting org count: ", err);
    }
};
