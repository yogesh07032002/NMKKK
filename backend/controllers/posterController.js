import Poster from "../models/Poster.js";

/* -------------------------------------------
   GET ALL POSTERS
------------------------------------------- */
export const getAllPosters = async (req, res) => {
  try {
    const posters = await Poster.find().sort({ createdAt: -1 });
    res.json(posters);
  } catch (err) {
    console.log("getAllPosters error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* -------------------------------------------
   CREATE POSTER
------------------------------------------- */
export const createPoster = async (req, res) => {
  try {
    const body = { ...req.body };

    if (body.type === "image" && req.file) {
      body.image = `/uploads/posters/${req.file.filename}`;
    }

    const newPoster = await Poster.create(body);
    res.json(newPoster);

  } catch (err) {
    console.log("createPoster error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* -------------------------------------------
   UPDATE POSTER
------------------------------------------- */
export const updatePoster = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = `/uploads/posters/${req.file.filename}`;
    }

    const poster = await Poster.findByIdAndUpdate(req.params.id, updates, {
      new: true
    });

    res.json(poster);

  } catch (err) {
    console.log("updatePoster error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* -------------------------------------------
   DELETE POSTER
------------------------------------------- */
export const deletePoster = async (req, res) => {
  try {
    await Poster.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.log("deletePoster error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
