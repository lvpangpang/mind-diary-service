"use strict";
const { Service } = require("egg");
const moment = require("moment");

class UserService extends Service {
  async login(openId) {
    const { app } = this;
    const { mysql, jwt, config } = app;
    const token = jwt.sign({ userId: openId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
    await mysql.query(
      `insert into wx_user_token (user_id, token, create_time) values('${openId}', '${token}', '${moment(
        new Date()
      ).format("YYYY-MM-DD HH:mm:ss")}')`
    );
    return {
      data: {
        token,
      },
    };
  }

  async getUser(token) {
    const { app } = this;
    const { mysql } = app;
    const user = await mysql.query(
      `select user_id from wx_user_token where token='${token}'`
    );
    if (user[0]) {
      return {
        data: user[0],
      };
    } else {
      return "查询用户信息失败";
    }
  }
}

module.exports = UserService;
