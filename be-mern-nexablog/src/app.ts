import express, { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 3000;
const localhost = `http://localhost:${PORT}`;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`Server is running on ${localhost}`);
});
