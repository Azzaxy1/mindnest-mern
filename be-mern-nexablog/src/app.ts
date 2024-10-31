import express from "express";

import blogRoutes from "./routes/blog";
import authRoutes from "./routes/auth";

const app = express();

const PORT = process.env.PORT || 8080;
const localhost = `http://localhost:${PORT}`;
const apiVersion = "/v1";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

app.use(express.json());
app.use(`${apiVersion}/auth`, authRoutes);
app.use(`${apiVersion}/blog`, blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${localhost}`);
});
