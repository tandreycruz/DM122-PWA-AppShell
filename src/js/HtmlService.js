export default class HtmlService {
  #ul;
  #todoService;

  constructor(todoService) {
    this.#todoService = todoService;
    this.#ul = document.querySelector("ul");
    this.#formInitialization();
    this.#listTasks();
  }

  #formInitialization() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(`👁️ [HtmlService.js] form trigged`);
      this.#addNewTask(form.task.value);
      form.reset();
      form.task.focus();
    });
  }

  async #listTasks() {
    const tasks = await this.#todoService.getAll();
    tasks.forEach((task) => this.#addTaskToDOM(task));
  }

  async #addNewTask(description) {
    const newTask = await this.#todoService.save({ description });
    if (newTask) this.#addTaskToDOM(newTask);
  }

  #addTaskToDOM(task) {
    console.log(`👁️ [HtmlService.js] adding task to DOM: ${task.description}`);
    const taskHtml = `
      <li id="${task.id}" onclick="htmlService.updateTask(this)">
        <span>${task.description}</span>
        <button onclick="htmlService.deleteTask(${task.id})">❌</button>
      </li>
    `;
    this.#ul.insertAdjacentHTML("beforeend", taskHtml);
  }

  // TODO: implement update
  async updateTask(element) {
    const isDone = element.classList.toggle("done");
    const task = element.getAttribute("data-task");
    console.log(`👁️ [HtmlService.js] `, task, element);
    // await this.#todoService.save({ description });
  }

  async deleteTask(taskId) {
    console.log(`👁️ [HtmlService.js] deleting task with id ${taskId}`);
    const isDeleted = this.#todoService.delete(taskId);
    if (isDeleted) document.getElementById(taskId).remove();
  }
}