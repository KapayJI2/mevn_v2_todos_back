import Router from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
  getFilteredTodo,
} from "../../controllers/todos/index.js";

export const todoRouter = Router();

todoRouter.get("/", async (req, res) => {
  getAllTodo(req, res);
});
todoRouter.post("/create", async (req, res) => {
  createTodo(req, res);
});
todoRouter.put("/:todo/update", async (req, res) => {
  updateTodo(req, res);
});
todoRouter.delete("/:todo/delete", async (req, res) => {
  deleteTodo(req, res);
});
todoRouter.get("/search/:text", async (req, res) => {
  getFilteredTodo(req, res);
});
