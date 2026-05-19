import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  reminderDate: {
    type: String,
    required: true
  },

  reminderTime: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.models.Reminder ||
mongoose.model("Reminder", ReminderSchema);
