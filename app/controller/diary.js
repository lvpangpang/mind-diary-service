"use strict";
const { Controller } = require("egg");

class DiaryController extends Controller {
  async add() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    const userId = ctx.state.userId;
    ctx.assert(content, "content不能为空");
    const data = await ctx.service.diary.add({ userId, content });
    return data;
  }
}

module.exports = DiaryController;
