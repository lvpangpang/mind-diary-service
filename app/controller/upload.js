"use strict";
const fs = require("fs-extra");
const path = require('path')
const { Controller } = require("egg");

class UploadController extends Controller {
  async upload() {
    const { ctx, app } = this;
    const { env } = app;

    try {
      const domain =
        env === "local"
          ? "http://10.16.20.9:3000"
          : "https://www.lvpangpang.com/api";

      const result = [];
      for (const file of ctx.request.files) {
        const filePath = file.filepath;
        const name = filePath.substring(
          filePath.replace(/\\/g, "/").lastIndexOf("/") + 1
        );
        try {
          const resultPath = path.join(process.cwd(), "/app/public/", name);
          fs.copySync(filePath, resultPath);
          result.push({
            url: domain + "/public/" + name,
          });
        } catch (err) {
          console.log(err);
        }
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
// C:\Users\57481\Desktop\github\mind-diary-service\app\public\2022\06\09\16\43cc5beb-3fef-4f88-aa85-963b8a884d14.jpg
module.exports = UploadController;
