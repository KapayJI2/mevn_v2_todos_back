import Todo from "../../model/todos/index.js";

export async function getAllTodo(req, res) {
  try {
    const owner = req.user.userId;
    const todos = await Todo.find({ owner });
    if (!todos.length) {
      return res.status(400).json({ message: "Not found" });
    }
    res.json(todos);
  } catch (e) {
    res.status(500).json({ message: "Error" });
    console.log(e);
  }
}
export async function createTodo(req, res) {
  try {
    const { title, content } = req.body;
    const todo = new Todo({ title, content, owner: req.user.userId });
    await todo.save();
    res.json({ message: "Тудушка успешно создана" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
    console.log(e);
  }
}
export async function updateTodo(req, res) {
  try {
    const { _id, title, content } = req.body;

    const todo = await Todo.findById({ _id });
    todo.title = title;
    todo.content = content;
    await todo.save();
    res.json({ message: "Тудушка успешно обновлена" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
    console.log(e);
  }
}
export async function deleteTodo(req, res) {
  try {
    const { _id } = req.body;
    await Todo.findOneAndDelete({
      _id,
      owner: req.user.userId,
    });
    res.json({ message: "Туду успешно удалена" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
    console.log(e);
  }
}
export async function getFilteredTodo(req, res) {
  try {
    const todos = await Todo.find({
      owner: req.user.userId,
    });
    const filteredTodos = todos.filter(
      (item) =>
        item.title.toUpperCase().indexOf(req.params.text.toUpperCase()) != -1
    );
    res.json(filteredTodos);
  } catch (e) {
    res.status(500).json({ message: "Error" });
    console.log(e);
  }
}
