"use strict";
const { Controller } = require("egg");
class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { phone, pwd } = ctx.request.body;
    const data = await ctx.service.user.login({ phone, pwd });
    return data;
  }

  async getUser() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    if (!id) {
      return "参数id为空";
    }
    const data = await ctx.service.user.getUser(id);
    return data;
  }

  async addUser() {
    const { ctx } = this;
    console.log(ctx.request.body);
    const { name, phone, pwd } = ctx.request.body;
    const data = await ctx.service.user.addUser({ name, phone, pwd });
    return data;
  }
}

module.exports = UserController;
