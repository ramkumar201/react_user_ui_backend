import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

const AuthMiddleware = async (req, res, next) => {

    try {
        /** Get Token */
        let details = {};
        if (req.headers && req.headers.authorization) {
            token = req.headers.authorization.split(" ");
            if (token.length === 2) {
                details = jwt.verify(token[1], process.env.JWT_TOKEN_KEY, (err, decode) => {
                    if (err) {
                        return refreshToken(req, res)
                    }
                    return decode;
                })
            } else {
                return res.json(401, { err: 'Format is Authorization: Bearer [token]' });
            }
        } else if (req.cookies._token) {
            details = jwt.verify(req.cookies._token, process.env.JWT_TOKEN_KEY, (err, decode) => {
                if (err) {
                    return refreshToken(req, res)
                }
                return decode;
            })
        } else if (req.cookies._refreshtoken) {
            details = refreshToken(req, res)
        } else {
            return res.json(401, { err: 'No Authorization header was found' });
        }

        if (Object.keys(details).length > 0) {
            let uid = details.user_id;
            const userData = await UserModel.findById(uid).exec();
            console.log(userData)
            req.user = userData;
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).send({ error: "Authentication Failed" })
    }
}

const refreshToken = (req, res) => {
    try {
        console.log("-- Refresh Token  --");
        return jwt.verify(req.cookies._refreshtoken, process.env.JWT_REFRESH_TOKEN_KEY);
    } catch (error) {
        return res.status(401).send({ error: "Authentication Failed" })
    }
}


export default AuthMiddleware;