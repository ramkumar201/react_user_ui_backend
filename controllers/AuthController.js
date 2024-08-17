import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import * as AuthService from "../services/AuthService.js";


export async function UserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                status: false,
                message: "Email or Password not found"
            });
        }

        let udata = await UserModel.findOne({ email }).exec();
        if (!udata) {
            return res.status(400).send({
                status: false,
                message: "Email not found"
            });
        }

        const chkPass = await bcrypt.compare(password, udata.password);
        if (!chkPass) {
            return res.status(400).send({
                status: false,
                message: "Password does not match"
            });
        }

        const token = await AuthService.GenerateToken(udata);
        const refreshToken = await AuthService.GenerateRefreshToken(udata);

        res.cookie('_token', token)
        res.cookie('_refreshtoken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' })

        return res.status(200).send({
            _token: token,
            _refreshToken: refreshToken,
            status: true,
            message: "Login successfully",
            data: udata,
        })

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function UserRegister(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({
                status: false,
                message: "The user details are not found."
            });
        }

        // Check if email already exists
        let udata = await UserModel.findOne({ email }).exec();
        if (udata) {
            return res.status(409).send({
                status: false,
                message: "Email already exists"
            });
        }

        if (!password) {
            return res.status(400).send({
                status: false,
                message: "Password is required"
            });
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
        return res.status(201).send({
            status: true,
            message: "User saved successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            error: "Internal Server Error"
        });
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
        const { id, token } = req.param;
        const { password } = req.body;
        if (!password) {
            return res.status(400).send({
                status: false,
                error: "Password not found"
            })
        }

        let udata = await UserModel.findOne({ _id: id }).exec();
        if (!udata) {
            return res.status(400).send({
                status: false,
                error: "Email not existed"
            })
        }

        const updatePassword = await bcrypt.hash(password, 10);

        return res.json("Verify OTP");
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