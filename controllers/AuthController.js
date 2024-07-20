import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function UserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Email or Password not found" });
        }

        let udata = await UserModel.findOne({ email }).exec();
        if (!udata) {
            return res.status(400).send({ message: "Email not found" });
        }

        const chkPass = await bcrypt.compare(password, udata.password);
        if (!chkPass) {
            return res.status(400).send({ message: "Password does not match" });
        }

        const token = jwt.sign({
            user_id: udata._id,
            email: udata.email,
            firstName: udata.firstName,
            lastName: udata.lastName
        }, process.env.JWT_KEY, { expiresIn: "2h" });

        return res.status(200).send({
            token: token,
            message: "Login successfully"
        })

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function UserRegister(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if email already exists
        let udata = await UserModel.findOne({ email }).exec();
        if (udata) {
            return res.status(409).send({ message: "Email already exists" });
        }

        if (!password) {
            return res.status(400).send({ message: "Password is required" });
        }

        // Hash the password and save the new user
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });

        await user.save();
        return res.status(201).send({ message: "User saved successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}


export async function GenerateOTP(req, res) {
    try {
        res.json("Generate OTP");
    } catch (error) {
        res.status(500).send(error);
    }
}


export async function VerifyOTP(req, res) {
    try {
        res.json("Verify OTP");
    } catch (error) {
        res.status(500).send(error);
    }

}

export async function ResetPassword(req, res) {
    try {
        res.json("Verify OTP");
    } catch (error) {
        res.status(500).send(error);
    }

}


export async function CreateResetSession(req, res) {
    try {
        res.json("Create Reset Session");
    } catch (error) {
        res.status(500).send(error);
    }

}