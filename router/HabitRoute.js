import express from "express";
import { createHabit, getUserHabits, deleteSingleHabit, dailyCompleteHabit } from "../controller/Habit.js";


export const HabitRouter = express.Router();

HabitRouter.post("/create", createHabit);
HabitRouter.post("/delete", deleteSingleHabit);
HabitRouter.post("/complete", dailyCompleteHabit);
HabitRouter.get("/user-habits/:userId", getUserHabits);