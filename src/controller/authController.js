import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const JWT_SECRET = "{8367E87C-B794-4A04-89DD-15FE7FDBFF78}";
export const JWT_EXPIRES_IN = "10m";

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: "HS256",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 10 * 60 * 1000),
    httpOnly: true,
  });
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const signup = async (req, res) => {
  const user = req.body;
  const result = await User.getUserByUserName(user.username);
  if (result.length > 0) {
    return res.status(400).json({
      status: "fail",
      message: "username already exists, try a new one",
    });
  }
  if (user.password !== user.passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message: "password and passwordConfirm do not match",
    });
  }
  user.password = await bcrypt.hash(user.password, 10);
  const id = await User.create(user);
  createSendToken({ id, name: user.name, username: user.username }, 201, res);
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "fail",
      message: "username and password required",
    });
  }
  const result = await User.getUserByUserName(username);
  if (!result || result.length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid username or password",
    });
  }
  const user = result[0];
  if (!(await correctPassword(password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid username or password",
    });
  }
  createSendToken(
    { id: user.id, name: user.name, username: user.username },
    200,
    res
  );
};

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Not authorized",
    });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: "Authentication failed",
    });
  }

  const result = await User.getUserById(decoded.id);
  if (!result && result.length === 0) {
    return res.status(401).json({
      status: "fail",
      message: "Not authorized",
    });
  }
  req.user = result[0];
  next();
};
