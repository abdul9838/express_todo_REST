import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import todoRouter from "./routes/todoRouter.js";

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
server.use(express.static(path.resolve(__dirname, "public")));
server.use(express.json());
server.use("/todos", todoRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
