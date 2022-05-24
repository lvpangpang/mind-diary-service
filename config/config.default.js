"use strict";

module.exports = (appInfo) => {
  const { env } = appInfo
  const config = {
    keys: appInfo.name + "_1652350446420_1606",
    mysql: {
      client: {
        host: env === 'local' ? "127.0.0.1" : '81.69.174.88',
        port: "3306",
        user: "root",
        password: env === 'local' ? "123456": "",
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
      expiresIn: 60 * 60 * 24
    },
    bodyParser: {
      jsonLimit: "1000mb"
    },
    publicRoutes: ["/", "/login", "/user/addUser", "/user/getUserList", ],
  };
  return config;
};
