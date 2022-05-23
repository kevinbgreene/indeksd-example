import { TodoItem } from "../codegen/todos";
import { clearChildren, closest, onSelector, querySelector } from "../helpers";

export class TodoList {
  #template: HTMLTemplateElement;
  #todoList: HTMLElement;

  constructor() {
    this.#template = querySelector<HTMLTemplateElement>(
      document,
      "#todo-item-template",
    );
    this.#todoList = querySelector<HTMLElement>(document, "#todo-list");
  }

  onCompleteItem(fn: (id: number) => void): void {
    this.#handleEvent(".todo-list-item .check-button", "click", fn);
  }

  onDeleteItem(fn: (id: number) => void): void {
    this.#handleEvent(".todo-list-item .delete-button", "click", fn);
  }

  markComplete(todoId: number): void {
    const itemToMark = querySelector(this.#todoList, `#todo-item-${todoId}`);
    console.log({ itemToMark });
    itemToMark.classList.add("complete");
  }

  removeTodo(todoId: number): void {
    const itemToRemove = querySelector(this.#todoList, `#todo-item-${todoId}`);
    itemToRemove.remove();
  }

  addTodo(todo: TodoItem): void {
    const newItem = this.#createNewTodoItem(todo);
    this.#todoList.append(newItem);
  }

  clear(): void {
    clearChildren(this.#todoList);
  }

  #handleEvent<EventName extends keyof GlobalEventHandlersEventMap>(
    selector: string,
    eventName: EventName,
    handler: (id: number) => void,
  ): void {
    onSelector(selector, eventName, ({ target }) => {
      console.log("handle: ", target);
      if (target instanceof Element) {
        const parent = closest<HTMLElement>(target, ".todo-list-item");
        const todoId = parent.dataset.id;
        if (todoId != null) {
          handler(parseInt(todoId));
        }
      }
    });
  }

  #createNewTodoItem(todo: TodoItem): HTMLElement {
    const clone = this.#template.content.cloneNode(true) as HTMLElement;
    const heading = querySelector<HTMLElement>(clone, "h3");
    const listItem = querySelector<HTMLElement>(clone, "li");

    heading.textContent = todo.name;
    listItem.dataset.id = `${todo.id}`;
    listItem.setAttribute("id", `todo-item-${todo.id}`);

    if (todo.complete) {
      listItem.classList.add("complete");
    }

    return clone;
  }
}
