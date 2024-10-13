import mongoose from "mongoose";
import UserFileModel from "../models/Userfiles.model.js";


export async function GetFile(req, res) {
    try {
        let type = req.query.type;

        if (! type) {
            return res.status(401).send({ message: 'Please provide the file type.' })
        }
        let userId = new mongoose.Types.ObjectId(req.user._id);
        let userFile = await UserFileModel.find({ user_id: userId, file_type: type}).exec();

        return res.status(200).send({
            status: true,
            data: userFile,
        })
    } catch (err) {
        console.log('err -- ', err);
        return res.status(404).send({
            status: false,
            message: "Something went wrong",
            err: err
        })
    }
}