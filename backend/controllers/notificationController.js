import Notification from "../models/Notification.js";

export const createNotification = async (req, res) => {
  try {
    const note = await Notification.create(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notes = await Notification.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getActiveNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ active: true }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const note = await Notification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
