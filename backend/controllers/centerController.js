import Center from "../models/Center.js";

export const createCenter = async (req, res) => {
  try {
    const center = await Center.create(req.body);
    res.json(center);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getCenters = async (req, res) => {
  try {
    const { district } = req.query;

    let filter = {};
    if (district) filter.district = district;

    const centers = await Center.find(filter).sort({ district: 1 });
    res.json(centers);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateCenter = async (req, res) => {
  try {
    const center = await Center.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(center);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteCenter = async (req, res) => {
  try {
    await Center.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
