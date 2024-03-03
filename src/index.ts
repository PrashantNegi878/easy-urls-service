import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router as urlRouter} from "./routes/url";
import connectToDb from "./db-config";
const app = express();
dotenv.config();

const PORT = process.env.PORT;

connectToDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:"*",
    credentials:true
}))

app.use("/url",urlRouter);

app.listen(PORT,()=> console.log(`Server started at port ${PORT}`));