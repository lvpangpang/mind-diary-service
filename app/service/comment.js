"use strict";
const { Service } = require("egg");
const moment = require("moment");

class CommentService extends Service {
  async get(id) {
    const { app } = this;
    const { mysql } = app;
    const data = await mysql.query(
      `select comment.id, comment.content, comment.reply_name, comment.create_time, comment.create_time, user.user_id, user.username from comment join user on user.user_id=comment.user_id where comment.community_id='${id}' order by comment.create_time ASC`
    );

    data.forEach((item) => {
      item["create_time"] = moment(item["create_time"]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    });

    return {
      data,
    };
  }

  async add({ userId, content, id, replyId }) {
    const { app } = this;
    const { mysql } = app;
    let replyName = "";
    if (replyId) {
      const data = await mysql.query(
        `select username from user where user_id='${replyId}'`
      );
      replyName = data[0]["username"];
    }
    await mysql.query(
      `insert into comment (community_id, user_id, reply_id, reply_name, content, create_time) values('${id}', '${userId}', '${replyId}', '${replyName}', '${content}', '${moment(
        new Date()
      ).format("YYYY-MM-DD HH:mm:ss")}')`
    );
    return {};
  }
}

module.exports = CommentService;
