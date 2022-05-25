"use strict";
const { Controller } = require("egg");

class UploadController extends Controller {
  async upload() {
    const { ctx, app } = this;
    const { env } = app;

    const domain =
      env === "local"
        ? "http://10.16.20.9:7001/"
        : "https://www.lvpangpang.com/";

    const result = [];
    for (const file of ctx.request.files) {
      const filePath = file.filepath;
      result.push({
        url:
          domain +
          filePath.substring(filePath.indexOf("public")).replace(/\\/g, "/"),
      });
    }
    return {
      data: result,
    };
  }
}

module.exports = UploadController;
