const userModel = require("../models/userModels");

const getAllUsers = async (req, res) => {
  try {
    const allDataUser = await userModel.findAll();
    res.status(200).json({
      message: "Users retrieved successfully",
      data: allDataUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const newUser = await userModel.create({ username, email });
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
