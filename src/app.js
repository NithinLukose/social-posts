import express from "express";
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";
import likesRouter from "./routes/likeRoutes.js";
import commentsRouter from "./routes/commentsRoute.js";

const app = express();

app.use(express.json());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/likes", likesRouter);
app.use("/api/v1/comments", commentsRouter);

export default app;
