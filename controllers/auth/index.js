import bcrypt from "bcryptjs";
import User from "../../model/users/index.js";
import validator from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
const { validationResult } = validator;

export async function registration(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect registration data",
      });
    }
    const { email, password, firstName, lastName, age, gender, phone } =
      req.body;
    const userExistByEmail = await User.findOne({ email });
    const userExistByPhone = await User.findOne({ phone });
    if (userExistByEmail && userExistByPhone) {
      return res.status(400).json({
        message: "Пользователь с таким email и телефоном уже существует",
      });
    }
    if (userExistByEmail) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
    }
    if (userExistByPhone) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким телефоном уже существует" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      gender,
      phone,
    });
    await user.save();
    res.json({ message: "Пользователь успешно создан" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
    console.log(e);
  }
}

export async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect login data",
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email не найден" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    return res.status(200).json({
      token,
      userId: user.id,
      user,
      message: "Вы успешно вошли в систему",
    });
  } catch (e) {
    res.status(500).json({ message: "Error" });
    console.log(e);
  }
}
