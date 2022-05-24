"use strict";
const { Service } = require("egg");
const moment = require("moment");

class UserService extends Service {
  async login({ userId, nickName, avatarUrl }) {
    const { app } = this;
    const { mysql, jwt, config } = app;
    const token = jwt.sign({ userId: userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
    await mysql.query(
      `insert into user_token (user_id, token, create_time) values('${userId}', '${token}', '${moment(
        new Date()
      ).format("YYYY-MM-DD HH:mm:ss")}')`
    );

    // 当前用户不存在，帮他注册
    const result = await mysql.query(
      `select * from user where user_id='${userId}'`
    );
    if (!result[0]) {
      await mysql.query(
        `insert into user (user_id, username, avatar_url, create_time) values('${userId}', '${nickName}', '${avatarUrl}', '${moment(
          new Date()
        ).format("YYYY-MM-DD HH:mm:ss")}')`
      );
    }
    
    return {
      data: {
        token,
      },
    };
  }

  async getUser(userId) {
    const { app } = this;
    const { mysql } = app;
    const user = await mysql.query(
      `select * from user where user_id='${userId}'`
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
