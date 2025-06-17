import express from "express";
import { createHabit, getUserHabits } from "../controller/Habit.js";


export const HabitRouter = express.Router();

HabitRouter.post("/create", createHabit);
HabitRouter.get("/user-habits/:userId", getUserHabits);