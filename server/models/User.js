// models/User.js (In-Memory replacement)
global.db = global.db || { users: [], projects: [], tasks: [] };

class User {
  constructor(data) {
    this._id = data._id || `user_${Math.random().toString(36).substr(2, 9)}`;
    this.id = this._id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || 'MEMBER';
    this.xpPoints = data.xpPoints || 0;
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    const idx = global.db.users.findIndex(u => u._id.toString() === this._id.toString());
    if (idx >= 0) {
      global.db.users[idx] = this;
    } else {
      global.db.users.push(this);
    }
    return this;
  }

  static async findOne(query) {
    let u;
    if (query.email) {
      u = global.db.users.find(x => x.email === query.email);
    } else if (query._id) {
      u = global.db.users.find(x => x._id.toString() === query._id.toString());
    }
    return u ? new User(u) : null;
  }

  static async findById(id) {
    const u = global.db.users.find(x => x._id.toString() === id.toString());
    return u ? new User(u) : null;
  }

  static async create(data) {
    const u = new User(data);
    await u.save();
    return u;
  }
}

module.exports = User;
