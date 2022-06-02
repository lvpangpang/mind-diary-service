"use strict";
const { Controller } = require("egg");

class CommentController extends Controller {
  async get() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    const data = await ctx.service.comment.get(id);
    return data;
  }

  async add() {
    const { ctx } = this;
    const { id, content, replyId } = ctx.request.body;
    const userId = ctx.state.userId;
    ctx.assert(content, "content为空");
    const data = await ctx.service.comment.add({ userId, content, id, replyId });
    return data;
  }
}

module.exports = CommentController;
