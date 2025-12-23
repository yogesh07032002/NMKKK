import User from "../../models/User.js";

export const getAllUser = async (req, res) => {
  try {
    let { department, city } = req.query;

    if (department) department = department.toLowerCase();
    if (city) city = city.toLowerCase();

    const filter = { role: "user" }; // only users

    // Department filter
    if (department) {
      filter.department = { $regex: department, $options: "i" };
    }

    // City filter inside address
    if (city) {
      filter["address.city"] = { $regex: city, $options: "i" };
    }

    const users = await User.find(filter).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
