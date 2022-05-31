"use strict";
const { Service } = require("egg");
const moment = require("moment");

class CommentService extends Service {
  async get({ pageIndex = 1 }) {
    const { app } = this;
    const { mysql } = app;
    const pageSize = 1000;
    const data = await mysql.query(
      `select community.id, community.content, community.create_time, user.username, user.avatar_url from community join user on user.user_id=community.user_id order by community.create_time DESC  limit ${
        (pageIndex - 1) * pageSize
      }, ${pageSize}`
    );
    const total = await mysql.query(`select count(*) from community`);

    data.forEach((item) => {
      item["create_time"] = moment(item["create_time"]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    });

    return {
      data: {
        list: data,
        total: total[0]["count(*)"],
        pageIndex,
      },
    };
  }

  async add({ userId, content, id, replyId }) {
    const { app } = this;
    const { mysql } = app;
    await mysql.query(
      `insert into comment (community_id, user_id, reply_id, content, create_time) values('${id}', '${userId}', '${replyId}', '${content}', '${moment(
        new Date()
      ).format("YYYY-MM-DD HH:mm:ss")}')`
    );
    return {};
  }
}

module.exports = CommentService;
