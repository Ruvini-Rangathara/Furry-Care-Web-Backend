import {Request, Response} from "express";
import LostNotice from "../model/lost-notice-model";

export const getLostNotices = async (req: Request, res: Response) => {
    try {
        const lostNotices = await LostNotice.find().sort({date: -1});
        res.json(lostNotices);
        console.log("Lost Notices:", lostNotices.toString());
    } catch (err) {
        res.status(500).json({message: 'Error while getting lost notices'});
        console.error('Error while getting lost notices:', err);
    }
}

export const addLostNotice = async (req: Request, res: Response) => {
    const lostNotice = new LostNotice({
        id: req.body.id,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description,
        status: req.body.status,
        petId: req.body.petId,
        username: req.body.username,
    });

    try {
        const savedLostNotice = await lostNotice.save();
        console.log("save lost notice!")
        res.json(savedLostNotice);
    } catch (err) {
        res.json({message: err});
        console.log("can not save lost notice! ", err)
    }
}

export const updateLostNotice = async (req: Request, res: Response) => {
    try {
        const updatedLostNotice = await LostNotice.updateOne(
            {id: req.params.id},
            {
                $set: {
                    id: req.body.id,
                    location: req.body.location,
                    date: req.body.date,
                    time: req.body.time,
                    description: req.body.description,
                    status: req.body.status,
                    petId: req.body.petId,
                    username: req.body.username,
                }
            }
        );
        res.json(updatedLostNotice);
        console.log("update lost notice!")
    } catch (err) {
        res.json({message: err});
        console.log("error while updating lost notice : ", err)
    }
}

export const deleteLostNotice = async (req: Request, res: Response) => {
    try {
        const deletedLostNotice = await LostNotice.deleteOne({id: req.params.id});
        res.json(deletedLostNotice);
        console.log("delete lost notice!")
    } catch (err) {
        res.json({message: err});
        console.log("error while deleting lost notice : ", err)
    }
}

export const getLostNoticeById = async (req: Request, res: Response) => {
    try {
        const lostNotice = await LostNotice.findOne({id: req.params.id});
        res.json(lostNotice);
        console.log("get lost notice by id!")
    } catch (err) {
        res.json({message: err});
        console.log("error while getting lost notice by id : ", err)
    }
}

export const getNewId = async (req: Request, res: Response) => {
    try {
        const lostNotices = await LostNotice.find().sort({id: -1});
        let newId = "";
        if (lostNotices.length === 0) {
            newId = "L-0001";
        } else {
            const lastId = lostNotices[0].id;
            const lastIdNumber = parseInt(lastId.substring(2, 6));
            newId = "L-" + (lastIdNumber + 1).toString().padStart(4, "0");
        }
        res.json(newId);
        console.log("new id for lost notice: ", newId);
    } catch (err) {
        res.status(500).json({message: 'Error while getting new id for lost notice'});
        console.error('Error while getting new id for lost notice:', err);
    }
};
