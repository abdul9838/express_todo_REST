import { Todo } from "./../model/todo.js";

const getAll = async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
};
const get = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
};

const create = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const todos = req.body.map((todoData) => new Todo(todoData));
      const savedTodos = await Promise.all(todos.map((todo) => todo.save()));
      return res.status(201).json(savedTodos);
    } else {
      const todo = new Todo(req.body);
      const savedTodo = await todo.save();
      return res.status(201).json(savedTodo);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating todo", error: error.message });
  }
};

const replace = async (req, res) => {
  const todo = await Todo.findOneAndReplace({ _id: req.params.id }, req.body, {
    new: true,
  });
  todo.save();
  res.json(todo);
};

const update = async (req, res) => {
  const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  todo.save();
  res.json(todo);
};
const deleteOne = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export { getAll, get, create, replace, update, deleteOne };
