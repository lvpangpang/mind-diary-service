"use strict";
const { Controller } = require("egg");

class CommunityController extends Controller {
  async get() {
    const { ctx } = this;
    const { pageIndex } = ctx.request.body;
    const data = await ctx.service.community.get({
      pageIndex
    });
    return data;
  }

  async getOne() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    ctx.assert(id, "id不能为空");
    const data = await ctx.service.community.getOne({
      id
    });
    return data;
  }

  async add() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    const userId = ctx.state.userId;
    ctx.assert(content, "content不能为空");
    const data = await ctx.service.community.add({ userId, content });
    return data;
  }
}

module.exports = CommunityController;
