"use strict";
const { Service } = require("egg");

class UserService extends Service {
  async login({ phone, pwd }) {
    const { app } = this;
    const { mysql, jwt, config } = app;
    const userInfo = await mysql.query(
      `select * from user where phone=${phone} and password=${pwd}`
    );
    if (userInfo[0]) {
      const userId = userInfo[0]["id"];
      const token = jwt.sign({ userId }, config.jwt.secret);
      await mysql.query(
        `insert into user_token (user_id, token) values('${userId}', '${token}')`
      );
      return {
        data: {
          token,
        },
      };
    } else {
      return "当前账号暂未注册";
    }
  }
  async getUser(id) {
    const { app } = this;
    const { mysql } = app;
    const user = await mysql.query("select * from user where id = " + id);
    if (user[0]) {
      return {
        data: user[0],
      };
    } else {
      return "查询用户信息失败";
    }
  }

  async addUser({ name, phone, pwd }) {
    const { app } = this;
    const { mysql } = app;
    await mysql.query(
      `insert into user (username, phone, password) values('${name}', '${phone}', '${pwd}')`
    );
    return null;
  }
}

module.exports = UserService;
