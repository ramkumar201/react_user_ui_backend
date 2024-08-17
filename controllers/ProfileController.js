
import UserModel from "../models/User.model.js";
import * as FileUploadService from "../services/FileUploadService.js";

export async function GetProfile(req, res) {
    try {

        let id = req.params.id;
        if (id) {
            let userData = await UserModel.findById(id).select([
                '_id', 'firstName', 'lastName', 'email', 'profile', 'phone', 'image', 'updatedAt'
            ]);
            return res.status(200).send(userData);
        } else {
            return res.status(201).send({ message: "Token user not found" });
        }
    } catch (error) {
        console.log(' -- Get Profile Error -- ', error)
        return res.status(404).send(error);
    }
}


export async function UpdateProfile(req, res) {
    try {
        let data = req.body;
        let authId = req.user._id;
        authId = authId.toString();

        if (data._id !== authId) {
            return res.status(401).send({
                message: "Update user not matched login user"
            })
        }

        let updateValue = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone
        }
        if (req.file) {
            let profileImg = await FileUploadService.uploadFile(req.file, 'profile');
            updateValue = { ...updateValue, image: profileImg }
        }

        await UserModel.findOneAndUpdate({ _id: authId }, updateValue).then(returnData => {
            res.status(200).send({
                message: "Update user profile",
                data: returnData
            })
        }).catch(err => {
            res.status(200).send({
                message: "Something went wrong",
                err: err
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}