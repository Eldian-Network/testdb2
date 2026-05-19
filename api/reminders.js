import connectDB from "../lib/mongodb.js";
import Reminder from "../models/Reminder.js";

export default async function handler(req, res) {

  await connectDB();

  // GET ALL REMINDERS
  if (req.method === "GET") {

    try {

      const reminders = await Reminder.find().sort({
        createdAt: -1
      });

      return res.status(200).json(reminders);

    } catch (error) {

      return res.status(500).json({
        success: false,
        error: error.message
      });

    }

  }

  // ADD REMINDER
  if (req.method === "POST") {

    try {

      const reminder = await Reminder.create(req.body);

      return res.status(201).json({
        success: true,
        reminder
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        error: error.message
      });

    }

  }

  // DELETE REMINDER
  if (req.method === "DELETE") {

    try {

      const { id } = req.query;

      await Reminder.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Reminder deleted"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        error: error.message
      });

    }

  }

  // UPDATE REMINDER
  if (req.method === "PUT") {

    try {

      const { id } = req.query;

      const updatedReminder =
        await Reminder.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true
          }
        );

      return res.status(200).json({
        success: true,
        updatedReminder
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        error: error.message
      });

    }

  }

  return res.status(405).json({
    success: false,
    message: "Method Not Allowed"
  });

}
