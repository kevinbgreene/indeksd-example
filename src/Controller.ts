import { TodoList } from "./views/TodoList";
import { TodosDatabaseClient } from "./codegen/todos";
import { TodoForm } from "./views/TodoForm";

export class Controller {
  #store: TodosDatabaseClient;
  #todoList: TodoList;
  #todoForm: TodoForm;

  constructor(
    todoList: TodoList,
    todoForm: TodoForm,
    store: TodosDatabaseClient,
  ) {
    this.#todoList = todoList;
    this.#todoForm = todoForm;
    this.#store = store;

    this.#todoForm.onAddItem(this.handleAddNewTodo.bind(this));
    this.#todoList.onCompleteItem(this.handleCompleteTodo.bind(this));
    this.#todoList.onDeleteItem(this.handleDeleteTodo.bind(this));
  }

  async show(): Promise<void> {
    const todos = await this.#store.todos.sortBy("id", { withJoins: false });
    this.#todoList.clear();
    for (const todo of todos) {
      this.#todoList.addTodo(todo);
    }
  }

  async handleCompleteTodo(id: number): Promise<void> {
    const todo = await this.#store.todos.get({ id });
    await this.#store.todos.put({
      ...todo,
      complete: true,
      status: {
        id: "complete",
        displayName: "Complete",
      },
    });
    this.#todoList.markComplete(id);
  }

  async handleDeleteTodo(id: number): Promise<void> {
    await this.#store.todos.delete({ id });
    this.#todoList.removeTodo(id);
  }

  async handleAddNewTodo(title: string): Promise<void> {
    const todo = await this.#store.todos.add({
      name: title,
      complete: false,
      status: {
        id: "not_started",
        displayName: "Not Started",
      },
      timestamp: Date.now(),
    });

    this.#todoList.addTodo(todo);
    this.#todoForm.clearInput();
  }
}
