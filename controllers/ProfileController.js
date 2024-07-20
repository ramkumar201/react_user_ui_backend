
import UserModel from "../models/User.model.js";

export async function GetProfile(req, res) {
    try {
        res.json("Get User Profile");
    } catch (error) {
        res.status(500).send(error);
    }
}


export async function UpdateProfile(req, res) {
    try {
        res.json("Update User Profile");
    } catch (error) {
        res.status(500).send(error);
    }
}