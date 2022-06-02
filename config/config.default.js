"use strict";
const path = require('path');

module.exports = (appInfo) => {
  const { env } = appInfo;
  console.log(appInfo)
  const config = {
    keys: appInfo.name + "_1652350446420_1606",
    mysql: {
      client: {
        host: env === "local" ? "127.0.0.1" : "81.69.174.88",
        port: "3306",
        user: "root",
        password: "123456",
        database: "lvfeifei",
      },
      app: true,
      agent: false,
    },
    middleware: ["auth", "result"],
    security: {
      csrf: {
        enable: false,
      },
    },
    jwt: {
      secret: "lvfeifei",
      expiresIn: 60 * 60 * 24 * 365,
    },
    bodyParser: {
      jsonLimit: "1000mb",
    },
    multipart: {
      mode: "file",
      tmpdir: path.join(__dirname, '../app/public/'),
      // 表单 Field 文件名长度限制
      fieldNameSize: 100,
      // 表单 Field 内容大小
      fieldSize: "100kb",
      // 表单 Field 最大个数
      fields: 10,
      // 单个文件大小
      fileSize: "10mb",
      // 允许上传的最大文件数
      files: 10,
    },
    publicRoutes: ["/", "/login", "/upload", '/community/get', '/community/getOne', '/comment/get'],
  };
  return config;
};
