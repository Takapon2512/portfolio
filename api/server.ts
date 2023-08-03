import express, { Application, Request, Response } from 'express';
const app: Application = express();

const PORT = 5000;

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));