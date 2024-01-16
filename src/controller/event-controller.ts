import {Request, Response}  from "express";
import Event from "../model/event-model";
import User from "../model/user-model";
import Complaint from "../model/complaint-model";

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
        console.log("Events:", events.toString());
    } catch (err) {
        res.status(500).json({ message: 'Error while getting events' });
        console.error('Error while getting events:', err);
    }
};


export const addEvent = async (req:Request,res:Response)=>{
    const event = new Event({
        id:req.body.id,
        title:req.body.title,
        location:req.body.location,
        date:req.body.date,
        time:req.body.time,
        description:req.body.description,
        username:req.body.username,
    });

    try{
        const savedEvent = await event.save();
        console.log("save event!")
        res.json(savedEvent);
    }catch(err){
        res.json({message:err});
        console.log("can not save event! ",err)
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const filter = { id: req.params.id };
        const update = {
            $set: {
                id: req.body.id,
                title: req.body.title,
                location: req.body.location,
                date: req.body.date,
                time: req.body.time,
                description: req.body.description,
                username: req.body.username,
            },
        };

        const options = { upsert: true };

        const updatedEvent = await Event.updateOne(filter, update, options);
        res.json(updatedEvent);
        console.log("updated event!");
    } catch (err:any) {
        res.status(500).json({ message: err.message });
        console.error("error while updating event: ", err);
    }
};



export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ id: req.params.id });
        res.json(event);
        console.log("event get successfully ");
    } catch (err) {
        res.json({ message: err });
        console.log("error while getting event : ",err)
    }
};


export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const removedEvent = await Event.deleteOne({ id: req.params.id });
        res.json(removedEvent);
        console.log("Event deleted");
    } catch (err) {
        res.status(500).json({ message: 'Error while deleting event' });
        console.error('Error while deleting event:', err);
    }
};

export const getNewId = async (req: Request, res: Response) => {
    try {
        const events = await Event.find().sort({id: -1});
        let newId = "";
        if (events.length === 0) {
            newId = "E-0001";
        } else {
            const lastId = events[0].id;
            const lastIdNumber = parseInt(lastId.substring(2, 6));
            newId = "E-" + (lastIdNumber + 1).toString().padStart(4, "0");
        }
        res.json(newId);
        console.log("new id for event: ", newId);
    } catch (err) {
        res.status(500).json({message: 'Error while getting new id for event'});
        console.error('Error while getting new id for event:', err);
    }
};
