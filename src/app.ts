import { init } from "./codegen/todos";
import { Controller } from "./Controller";
import { TodoForm } from "./views/TodoForm";
import { TodoList } from "./views/TodoList";

async function main() {
  const db = await init();
  const todoList = new TodoList();
  const todoForm = new TodoForm();
  const controller = new Controller(todoList, todoForm, db);

  controller.renderList();
}

main();
