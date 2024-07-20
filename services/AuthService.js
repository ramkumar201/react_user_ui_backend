import jwt from "jsonwebtoken";


export async function GenerateToken(data) {
    try {
        const token = jwt.sign({
            user_id: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        }, process.env.JWT_TOKEN_KEY, { expiresIn: "2h" })

        return token;

    } catch (err) {
        console.log('Generate Token Error -- ', err);
        return '';
    }
}


export async function VerifyToken(token) {
    try {
        console.log(token)
    } catch (err) {
        console.log('Generate Token Error -- ', err);
        return '';
    }
}