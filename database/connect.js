import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
    try {
        const clientOptions = {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            },
        }
        await mongoose.connect(process.env.MONGO_DB_URL, clientOptions)
    } catch (err) {
        console.log("Mongo DB Connection Error --", err)
    }
}

export default connect;