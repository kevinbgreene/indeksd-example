import { onSelector, querySelector } from "../helpers";

export class TodoForm {
  #form: HTMLFormElement;
  #input: HTMLInputElement;

  constructor() {
    this.#form = querySelector<HTMLFormElement>(document, "#todo-form");
    this.#input = querySelector<HTMLInputElement>(this.#form, "#todo-input");
  }

  onAddItem(fn: (val: string) => void): void {
    onSelector("#todo-form", "submit", (e) => {
      e.preventDefault();
      const newTodo = this.#input.value.trim();
      if (newTodo === "") {
        return;
      }

      fn(newTodo);
    });
  }

  clearInput(): void {
    this.#input.value = "";
  }
}
