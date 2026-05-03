// models/Project.js (In-Memory replacement)
global.db = global.db || { users: [], projects: [], tasks: [] };

const makePopulateArray = (arr) => {
  arr.populate = function(field) {
    for (let item of this) {
      if (field === 'ownerId' && typeof item.ownerId === 'string') {
        const u = global.db.users.find(u => u._id.toString() === item.ownerId);
        if (u) item.ownerId = { _id: u._id, id: u._id, name: u.name, email: u.email };
      }
      if (field === 'members' && Array.isArray(item.members)) {
        item.members = item.members.map(mid => {
          const u = global.db.users.find(u => u._id.toString() === mid.toString());
          return u ? { _id: u._id, id: u._id, name: u.name, email: u.email } : mid;
        });
      }
    }
    return this;
  };
  return arr;
};

class Project {
  constructor(data) {
    this._id = data._id || `proj_${Math.random().toString(36).substr(2, 9)}`;
    this.id = this._id;
    this.name = data.name;
    this.description = data.description;
    this.ownerId = data.ownerId;
    this.members = data.members || [];
    this.themeColor = data.themeColor || '#14E8CE';
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    const idx = global.db.projects.findIndex(p => p._id.toString() === this._id.toString());
    if (idx >= 0) {
      global.db.projects[idx] = this;
    } else {
      global.db.projects.push(this);
    }
    return this;
  }

  async deleteOne() {
    global.db.projects = global.db.projects.filter(p => p._id.toString() !== this._id.toString());
    global.db.tasks = global.db.tasks.filter(t => t.projectId.toString() !== this._id.toString());
    return this;
  }

  static async find(query = {}) {
    let results = [...global.db.projects];
    if (query.$or) {
      const ownerId = query.$or[0].ownerId;
      results = results.filter(p => p.ownerId.toString() === ownerId.toString() || p.members.map(m => m.toString()).includes(ownerId.toString()));
    }
    return makePopulateArray(results.map(p => new Project(p)));
  }

  static async findById(id) {
    const p = global.db.projects.find(x => x._id.toString() === id.toString());
    return p ? new Project(p) : null;
  }

  static async create(data) {
    const p = new Project(data);
    await p.save();
    return p;
  }
}

module.exports = Project;
