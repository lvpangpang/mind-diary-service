"use strict";
const { Controller } = require("egg");

class CommunityController extends Controller {
  async get() {
    const { ctx } = this;
    const { pageIndex = 1, pageSize = 10 } = ctx.request.query;
    const data = await ctx.service.community.get({
      pageIndex,
      pageSize,
    });
    return data;
  }

  async getOne() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    ctx.assert(id, "id不能为空");
    const data = await ctx.service.community.getOne({
      id,
    });
    return data;
  }

  async add() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    const userId = ctx.state.userId;
    // 只允许吕肥肥发帖
    if (userId !== "of_rs5J06mkPuhFfH7_QXV_5UsmM") {
      return "只支持肥肥发帖";
    }
    ctx.assert(content, "content不能为空");
    const data = await ctx.service.community.add({ userId, content });
    return data;
  }
}

module.exports = CommunityController;
