import { HabitModel } from "../model/HabitModel.js";
import connectDb from "../utils/connectDb.js";

const createHabit = async (req, res) => {
  await connectDb(); // Ensure DB connection

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

export { createHabit };
