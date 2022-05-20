"use strict";
const { Controller } = require("egg");
class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { phone, pwd } = ctx.request.body;
    ctx.assert(phone, "手机号不能为空");
    ctx.assert(pwd, "密码不能为空");
    const data = await ctx.service.user.login({ phone, pwd });
    return data;
  }

  async getUser() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    ctx.assert(id, "id不能为空");
    const data = await ctx.service.user.getUser(id);
    return data;
  }

  async getUserList() {
    const { ctx } = this;
    const data = await ctx.service.user.getUserList();
    return data;
  }

  async addUser() {
    const { ctx } = this;
    const { name, phone, pwd } = ctx.request.body;
    ctx.assert(name, "名称不能为空");
    ctx.assert(phone, "手机号不能为空");
    ctx.assert(pwd, "密码不能为空");
    const data = await ctx.service.user.addUser({ name, phone, pwd });
    return data;
  }
}

module.exports = UserController;
