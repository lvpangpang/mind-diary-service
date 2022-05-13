'use strict';
const { Service } = require('egg');

class UserService extends Service {
  async find(id) {
    const { app } = this;
    const { mysql } = app;
    const user = await mysql.query('select * from user where id = ' + id);
    return user;
  }
}

module.exports = UserService;
