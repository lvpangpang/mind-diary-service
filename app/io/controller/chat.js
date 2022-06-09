"use strict";
const { Controller } = require("egg");

class ChatController extends Controller {
  async message() {
    const { ctx, app } = this;
    const nsp = app.io.of("/");
    const data = ctx.args[0] || {};
    try {
      const { msg } = data;
      nsp.emit('msg', msg);
    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = ChatController;
