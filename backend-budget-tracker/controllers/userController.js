const userService = require("../services/userService.js");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await userService.registerUser({
      name,
      email,
      password,
    });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.loginUser({ email, password });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out successfully" });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getCurrentUser(req.user.userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};