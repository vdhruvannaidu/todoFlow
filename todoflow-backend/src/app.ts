import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import dotenv from "dotenv";
import { json } from "body-parser";
import {
  register,
  login,
  refresh,
  logout,
  currentUser,
  getAllUsers,
} from "./controllers/auth.controller";
import { authenticate } from "./middlewares/auth.middleware";
import {
  createTodo,
  listTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "./controllers/todos.controller";
import { errorMiddleware } from "./middlewares/error.middleware";
import { get } from "http";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());

// Auth routes
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.post("/api/auth/refresh", refresh);
app.post("/api/auth/logout", logout);
app.post("/api/auth/currentUser", currentUser);
app.get("/api/auth/getAllUser", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users); // <-- Send response to client
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Todo routes (protected)
app.post("/api/todos", authenticate, createTodo);
app.get("/api/todos", authenticate, listTodos);
app.get("/api/todos/:id", authenticate, getTodo);
app.patch("/api/todos/:id", authenticate, updateTodo);
app.delete("/api/todos/:id", authenticate, deleteTodo);

app.use(errorMiddleware);

export default app;
