import express from "express";
import { createHabit } from "../controller/Habit.js";


export const HabitRouter = express.Router();

HabitRouter.use("/create", createHabit);