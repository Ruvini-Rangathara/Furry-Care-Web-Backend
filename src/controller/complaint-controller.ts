import {Request, Response} from "express";
import Complaint from "../model/complaint-model";

export const getComplaints = async (req: Request, res: Response) => {
    try {
        const complaints = await Complaint.find().sort({date: -1});
        res.json(complaints);
        console.log("Complaints:", complaints.toString());
    } catch (err) {
        res.status(500).json({message: 'Error while getting complaints'});
        console.error('Error while getting complaints:', err);
    }
};

export const addComplaint = async (req: Request, res: Response) => {
    const complaint = new Complaint({
        id: req.body.id,
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        status: req.body.status,
        username: req.body.username,
    });

    try {
        const savedComplaint = await complaint.save();
        console.log("save complaint!")
        res.json(savedComplaint);
    } catch (err) {
        res.json({message: err});
        console.log("can not save complaint! ", err)
    }
}

export const updateComplaint = async (req: Request, res: Response) => {
    try {
        const updatedComplaint = await Complaint.updateOne(
            {id: req.params.id},
            {
                $set: {
                    id: req.body.id,
                    date: req.body.date,
                    title: req.body.title,
                    description: req.body.description,
                    location: req.body.location,
                    status: req.body.status,
                    username: req.body.username,
                }
            }
        );
        res.json(updatedComplaint);
        console.log("update complaint!")
    } catch (err) {
        res.json({message: err});
        console.log("error while updating complaint : ", err)
    }

}

export const getComplaintById = async (req: Request, res: Response) => {
    const complaintId = req.params.id;
    try {
        const complaint = await Complaint.findOne({ id: complaintId });
        res.json(complaint);
        console.log("Complaint get ");
    } catch (err) {
        res.status(500).json({ message: 'Error while getting complaint' });
        console.error('Error while getting complaint:', err);
    }
};


export const deleteComplaint = async (req: Request, res: Response) => {
    try {
        const removedComplaint = await Complaint.deleteOne({id: req.params.id});
        res.json(removedComplaint);
        console.log("delete complaint!")
    } catch (err) {
        res.json({message: err});
        console.log("error while deleting complaint : ", err)
    }
}
