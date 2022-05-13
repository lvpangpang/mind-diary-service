'use strict';
const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const id = ctx.query.id;
    const data = await ctx.service.user.find(id);
    return {
      data,
      msg: '哈哈'
    }
  }
}

module.exports = UserController;
