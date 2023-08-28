import express, { Application } from 'express';
import "dotenv/config";
import cors from "cors";

//routers
import { authRouter } from './routers/auth';
import { postsRouter } from './routers/posts';

const app: Application = express();
const PORT = 5000;

//異なるURLへのアクセスを許可する
app.use(cors());
//Json形式の送信を許可する
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));