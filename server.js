import express from "express";
import connectDb from "./utils/connectDb.js";
import dotenv from "dotenv";
import cors from "cors";
import { HabitRouter } from "./router/HabitRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//config
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter );
app.use ("/habits", HabitRouter);

//Db
await connectDb()

app.get("/", (req, res)=>{
    res.send("Api running")
})

app.listen(port, ()=>{
    console.log(`App running on http://localhost:${port}`);
})
