import express from "express";
import { createHabit } from "../controller/CreateHabit.js";


export const HabitRouter = express.Router();

HabitRouter.use("/", createHabit);