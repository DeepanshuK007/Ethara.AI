// models/Task.js (In-Memory replacement)
global.db = global.db || { users: [], projects: [], tasks: [] };

const makePopulateArray = (arr) => {
  arr.populate = function(field) {
    for (let item of this) {
      if (field === 'assigneeId' && typeof item.assigneeId === 'string') {
        const u = global.db.users.find(u => u._id.toString() === item.assigneeId);
        if (u) item.assigneeId = { _id: u._id, id: u._id, name: u.name, email: u.email };
      }
    }
    return this;
  };
  return arr;
};

class Task {
  constructor(data) {
    this._id = data._id || `task_${Math.random().toString(36).substr(2, 9)}`;
    this.id = this._id;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status || 'TODO';
    this.dueDate = data.dueDate;
    this.projectId = data.projectId;
    this.assigneeId = data.assigneeId;
    this.checklist = data.checklist || [];
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    const idx = global.db.tasks.findIndex(t => t._id.toString() === this._id.toString());
    if (idx >= 0) {
      global.db.tasks[idx] = this;
    } else {
      global.db.tasks.push(this);
    }
    return this;
  }

  async deleteOne() {
    global.db.tasks = global.db.tasks.filter(t => t._id.toString() !== this._id.toString());
    return this;
  }

  static async find(query = {}) {
    let results = [...global.db.tasks];
    if (query.projectId) {
      results = results.filter(t => t.projectId.toString() === query.projectId.toString());
    }
    return makePopulateArray(results.map(t => new Task(t)));
  }

  static async findById(id) {
    const t = global.db.tasks.find(x => x._id.toString() === id.toString());
    return t ? new Task(t) : null;
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    const idx = global.db.tasks.findIndex(t => t._id.toString() === id.toString());
    if (idx >= 0) {
      global.db.tasks[idx] = { ...global.db.tasks[idx], ...update };
      return new Task(global.db.tasks[idx]);
    }
    return null;
  }

  static async create(data) {
    if (Array.isArray(data)) {
      const created = [];
      for (const item of data) {
        const t = new Task(item);
        await t.save();
        created.push(t);
      }
      return created;
    }
    const t = new Task(data);
    await t.save();
    return t;
  }
}

module.exports = Task;
