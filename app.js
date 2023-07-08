import express from "express";
import config from "config";
import mongoose from "mongoose";
import cors from "cors";
import { authRoutes } from "./routes/auth/auth.routes.js";
import { userRouter } from "./routes/user/user.routes.js";
import { todoRouter } from "./routes/todos/todos.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = config.get("port") || 5000;
const MONGO_DB_URL = config.get("mongoDbUrl");

app.use(
  cors({
    origin: "*",
  })
);

// app.use(cors());

app.use(
  express.json({
    extended: true,
  })
);

// app.use(bodyParser.json());
app.use("/api/auth/", authRoutes);
app.use("/api/user", authMiddleware, userRouter);
app.use("/api/todo", authMiddleware, todoRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log("error Server", e.message);
    process.exit(1);
  }
}
start();
