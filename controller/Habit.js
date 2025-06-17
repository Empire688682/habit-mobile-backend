import { HabitModel } from "../model/HabitModel.js";
import { UserModel } from "../model/UserModel.js";
import connectDb from "../utils/connectDb.js";

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
    return res.status(500).json({ error: "Internal server error" })
  }
}

export { createHabit, getUserHabits };
