import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // reference to a User model if you're using authentication
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
   streak: {
    type: Number,
    default: 0
  },
  completedDates: {
    type: [Date], // dates the user completed the habit
    default: [],
  },
  lastCompleted: {
    type: Date,
  }
}, {
  timestamps: true,
});

export const HabitModel = mongoose.models.Habit || mongoose.model("Habit", HabitSchema);
