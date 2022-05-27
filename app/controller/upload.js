"use strict";
const { Controller } = require("egg");

class UploadController extends Controller {
  async upload() {
    const { ctx, app } = this;
    const { env } = app;

    try {
      const domain =
        env === "local"
          ? "http://10.16.20.9:3000/"
          : "https://www.lvpangpang.com/api/";

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
    } catch (err) {
      return {
        data: err,
      };
    }
  }
}

module.exports = UploadController;
