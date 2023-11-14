import dotenv from "dotenv";
dotenv.config();
import syncDB from "./src/database/app.js";
import express from "express";
const app = express();
app.use(express.json());

import userRouter from "./src/routers/user.router.js";
import loginRouter from "./src/routers/login.router.js";
import postRouter from "./src/routers/post.router.js";

import { authenticate } from "./src/middlewares/authenticate.js";

app.get("/", authenticate,(req, res) => {
    res.status(200).json({message: "sucesso."});
});

app.use("/", loginRouter);
app.use("/", userRouter);
app.use("/", authenticate, postRouter);

app.listen(process.env.SERVERPORT, async () => {
    console.log(`servidor rodando na porta: `, process.env.SERVERPORT);
    await syncDB();
});