import express from "express";
import cors from "cors";
import connect from "./database/connect.js";
import router from "./router/route.js";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.json({ "start": true });
})


/** API Route */
app.use('/v1/api', router)


connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to the PORT : ${PORT}`);
        });
    } catch (error) {
        console.log('Database not connected');
    }

})
