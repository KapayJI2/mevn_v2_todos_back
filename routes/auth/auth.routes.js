import Router from "express";
import validator from "express-validator";
const { check } = validator;
import { registration, login } from "../../controllers/auth/index.js";

export const authRoutes = Router();

authRoutes.post(
  "/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    registration(req, res);
  }
);
authRoutes.post(
  "/login",
  [
    check("email", "Input correct email").normalizeEmail().isEmail(),
    check("password", "Input password").exists(),
  ],
  async (req, res) => {
    login(req, res);
  }
);
