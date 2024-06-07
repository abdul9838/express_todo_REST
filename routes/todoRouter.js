import { Router } from "express";
import {
  create,
  deleteOne,
  get,
  getAll,
  replace,
  update,
} from "../controllers/todo.js";
const todoRouter = Router();
todoRouter
  .get("/", getAll)
  .get("/:id", get)
  .post("/", create)
  .put("/:id", replace)
  .patch("/:id", update)
  .delete("/:id", deleteOne);

export default todoRouter;
