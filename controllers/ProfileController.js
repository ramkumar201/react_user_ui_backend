
import UserModel from "../models/User.model.js";

export async function GetProfile(req, res) {
    try {
        let user = req.user;
        if (user) {
            let id = decode.user_id;
            let userData = await UserModel.findById(id).select([
                '_id', 'firstName', 'lastName', 'email', 'profile', 'updatedAt'
            ]);
            return res.status(200).send(userData);
        } else {
            return res.status(201).send({ message: "Token user not found" });
        }
    } catch (error) {
        console.log(' -- Get Profile Error -- ')
        return res.status(404).send(error);
    }
}


export async function UpdateProfile(req, res) {
    try {
        res.json("Update User Profile");
    } catch (error) {
        res.status(500).send(error);
    }
}