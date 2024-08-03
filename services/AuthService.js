import jwt from "jsonwebtoken";

/** Generate JWT Token */
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
        console.log('Generate Token Error -- ');
        return '';
    }
}

/** Generate JWT Refresh Token */
export async function GenerateRefreshToken(data) {
    try {
        const refreshToken = jwt.sign({
            user_id: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        }, process.env.JWT_REFRESH_TOKEN_KEY, { expiresIn: "5h" })

        return refreshToken;

    } catch (err) {
        console.log('Generate Refresh Token Error -- ');
        return '';
    }
}

/** Verify JWT Token */
export async function VerifyToken(req, callback) {
    try {
        const accessToken = req.cookies._token;
        if (!accessToken) {
            VerifyRefreshToken(req, (err, check) => {
                callback(err, check);
            })
        } else {
            return jwt.verify(accessToken, process.env.JWT_TOKEN_KEY, callback)
        }
    } catch (err) {
        console.log('Generate Token Error -- ');
        callback({
            name: 'TOKEN_NOT_FOUND',
            message: 'Authentication failed'
        });
    }
}

/** Verify JWT Refresh Token */
export async function VerifyRefreshToken(req, callback) {
    try {
        const refreshToken = req.cookies._refreshtoken;
        if (!refreshToken) {
            callback({
                name: 'TOKEN_NOT_FOUND',
                message: 'Authentication failed'
            })
        } else {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY, callback)
        }

    } catch (err) {
        console.log('Verify Refresh Token Error -- ');
        callback({
            name: 'TOKEN_NOT_FOUND',
            message: 'Authentication failed'
        })
    }
}