import { Request, Response } from 'express';
import User from '../model/user-model';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log("users: ",users.toString())
    } catch (err) {
        res.json({ message: err });
        console.log("error while getting users")
    }
}

export const addUser = async (req: Request, res: Response) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        contact: req.body.contact,
    });

    try {
        const savedUser = await user.save();
        console.log("save user!")
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
        console.log("can not save user! ", err)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.updateOne(
            { username: req.params.username },
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password,
                    role: req.body.role,
                    name: req.body.name,
                    email: req.body.email,
                    location: req.body.location,
                    contact: req.body.contact,
                }
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
        console.log("error while updating user : ",err)
    }

}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
        console.log("error while getting user : ",err)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const removedUser = await User.deleteOne({ username: req.params.username });
        res.json(removedUser);
        console.log("delete user!")
    } catch (err) {
        res.json({ message: err });
        console.log("error while deleting user : ",err)
    }
}

export const getUserByRole = async (req: Request, res: Response) => {
    try {
        const user = await User.find({ role: req.params.role });
        res.json(user);
        console.log("get user by role!")
    } catch (err) {
        res.json({ message: err });
        console.log("error while getting user : ",err)
    }
}