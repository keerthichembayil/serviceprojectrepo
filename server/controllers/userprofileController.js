const User = require("../models/User");
 const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
  

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    console.log("user from backend",user);
    res.json(user);
   
  } catch (error) {
    next(error); // Passes the error to Express's error handler
  }
};


const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user profile
// @route   DELETE /api/users/delete
// @access  Private
 const deleteUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUserProfile, updateUserProfile, deleteUserProfile };