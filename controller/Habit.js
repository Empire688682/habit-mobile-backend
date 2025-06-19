import { HabitModel } from "../model/HabitModel.js";
import { UserModel } from "../model/UserModel.js";
import connectDb from "../utils/connectDb.js";
import {startOfDay, differenceInCalendarDays, isSameDay, format} from "date-fns"

const createHabit = async (req, res) => {
  await connectDb();

  try {
    const { userId, title, description, frequency, startDate } = req.body;

    if (!userId || !title || !frequency) {
      return res.status(400).json({ error: "userId, title, and frequency are required." });
    }

    const newHabit = new HabitModel({
      userId,
      title,
      description,
      frequency,
      startDate,
    });

    const savedHabit = await newHabit.save();

    res.status(201).json(savedHabit);
  } catch (error) {
    console.error("createHabit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const getUserHabits = async (req, res) =>{
  await connectDb();
  try {
    const {userId} = req.params;
    if(!userId){
      return res.status(400).json({ error: "Request with no data" });
    }

    const user = await UserModel.findById(userId);
    if(!user){
      return res.status(400).json({ error: "User not authenticated" });
    };

    const userHabits = await HabitModel.find({userId});
    res.status(201).json(userHabits);
    
  } catch (error) {
    console.log("getHabitErro:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSingleHabit = async (req, res) =>{
  const {userId, habitId} = req.body;
  await connectDb();
  try {
    if(!userId || !habitId){
      return res.status(400).json({ error: "UserId and habitId are required" });
    }
    const isAuthenticated = await UserModel.findOne({_id:userId});
    if(!isAuthenticated){
      return res.status(400).json({ error: "user not authenticated" });
    };

    const habit = await HabitModel.findById(habitId);
    if(!habit){
      return res.status(400).json({ error: "habit not found" })
    };

    await HabitModel.findByIdAndDelete(habitId, {new:true});
    return res.status(201).json({ message: "habit deleted" });

  } catch (error) {
    console.log("habitDeletingError:", error);
    res.status(500).json({ error: "An error occured" });
  }
};

const dailyCompleteHabit = async (req, res) =>{
  const {userId, habitId} = req.body;
  await connectDb();
  try {
    if(!userId || !habitId){
      return res.status(400).json({ error: "UserId and habitId are required" });
    }
    const isAuthenticated = await UserModel.findOne({_id:userId});
    if(!isAuthenticated){
      return res.status(400).json({ error: "user not authenticated" });
    };

    const habit = await HabitModel.findById(habitId);
    if(!habit){
      return res.status(400).json({ error: "habit not found" });
    };

    const today = startOfDay(new Date());
    const lastCompleted = habit.lastCompleted ? startOfDay(habit.lastCompleted) : null;

    if(lastCompleted && isSameDay(today, lastCompleted) ){
      return res.status(400).json({ error: "Habit already completed today" });
    };

    let newStreak = 1;
    if(lastCompleted){
      const daysPassed = differenceInCalendarDays(today, lastCompleted);
      newStreak = daysPassed === 1 ? habit.streak + 1 : 1
    }

    habit.lastCompleted = today;
    habit.streak = newStreak
    habit.completedDates.push(today);

    await habit.save();

    return res.status(200).json({ message: "Habit marked as completed", habit });

  } catch (error) {
    console.log("habitCompletingError:", error);
    res.status(500).json({ error: "An error occured" });
  }
};

export { createHabit, getUserHabits, deleteSingleHabit, dailyCompleteHabit };
