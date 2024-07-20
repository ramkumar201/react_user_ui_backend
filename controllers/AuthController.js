import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";

export async function UserLogin(req, res) {
    try {
        res.json("User Login");
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