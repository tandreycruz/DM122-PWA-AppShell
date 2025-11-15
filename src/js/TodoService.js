import Dexie from "https://cdn.jsdelivr.net/npm/dexie@4.2.1/+esm";

const DB_KEY = "PWA::TODO:DB";

export default class TodoService {
  #db = [];

  constructor() {
    this.#initializeDB();
  }

  #initializeDB() {
    console.log(`[TodoService.js] initializing DB`);
    const db = new Dexie(DB_KEY);
    db.version(1).stores({
      todo: "++id",
    });
    db.on("populate", async () => {
      db.todo.bulkPut([
        {
          task: "Learn PWA",
          createdDate: new Date(),
          done: false,
        },
        {
          task: "Learn HTML5 APIs",
          createdDate: new Date(),
          done: true,
        },
        {
          task: "Eat an 🍎",
          createdDate: new Date(),
          done: false,
        },
      ]);
    });
    db.open();
    this.#db = db;
  }

  async save({ task, createdDate = new Date(), done = false }) {
    if (!task) {
      console.error(`[TodoService.js] no task provided`);
      return;
    }
    const taskRecord = {
      task,
      createdDate,
      updatedDate: new Date(),
      done,
    };
    try {
      const savedId = await this.#db.todo.put(taskRecord);
      console.log(`[TodoService.js] ${task} saved`);
      return { id: savedId, ...taskRecord };
    } catch (error) {
      console.error(`Error when adding task: ${task}`, error);
    }
  }

  async getAll() {
    return this.#db.todo.toArray();
  }

  async delete(taskId) {
    await this.#db.todo.delete(taskId);
    console.log(`[TodoService.js] deleted ${taskId}`);
    return true;
  }
}