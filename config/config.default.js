"use strict";

module.exports = (appInfo) => {
  const config = {
    keys: appInfo.name + "_1652350446420_1606",
    mysql: {
      client: {
        host: "127.0.0.1",
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
    },
    publicRoutes: ["/", "/user/login", "/user/addUser"],
  };
  return config;
};
