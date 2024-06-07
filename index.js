import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import todoRouter from "./routes/todoRouter.js";

const server = express();

async function main() {
  await mongoose.connect(
    "mongodb+srv://abdulahadansari810:mongodb007@cluster0.glhdiwj.mongodb.net/notes"
  );
}
main().catch((err) => console.log(err));

server.use(cors());
server.use(express.static("public"));
server.use(express.json());
server.use("/todos", todoRouter);

server.listen(8000, () => {
  console.log("http//localhost:8000");
});
