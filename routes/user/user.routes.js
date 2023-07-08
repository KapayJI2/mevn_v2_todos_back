import Router from "express";
import { changeUserData, getUserData } from "../../controllers/user/index.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

export const userRouter = Router();

userRouter.get("/:user", authMiddleware, async (req, res) =>
  getUserData(req, res)
);
userRouter.put("/:user/change-info", authMiddleware, async (req, res) => {
  changeUserData(req, res);
});
