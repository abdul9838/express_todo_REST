import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import todoRouter from "./routes/todoRouter.js";
import { readFile } from "fs";

dotenv.config();

const server = express();

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
main();

server.use(cors());
server.use(express.static("public"));

server.use(express.json());
server.use("/todos", todoRouter);

server.use("/", (req, res) => {
  readFile("index.html");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
