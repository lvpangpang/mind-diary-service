"use strict";
const { Service } = require("egg");
const moment = require("moment");

class CommunityService extends Service {
  async get({ pageIndex, pageSize}) {
    const { app } = this;
    const { mysql } = app;
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
        total: total[0]["count(*)"]
      },
    };
  }

  async getOne({ id }) {
    const { app } = this;
    const { mysql } = app;
    const data = await mysql.query(
      `select community.id, community.content, community.create_time, user.username, user.avatar_url from community join user on user.user_id=community.user_id where community.id='${id}'`
    );

    data.forEach((item) => {
      item["create_time"] = moment(item["create_time"]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    });

    return {
      data: data[0]
    };
  }

  async add({ userId, content }) {
    const { app } = this;
    const { mysql } = app;
    await mysql.query(
      `insert into community (user_id, content, create_time) values('${userId}', '${content}', '${moment(
        new Date()
      ).format("YYYY-MM-DD HH:mm:ss")}')`
    );
    return {};
  }
}

module.exports = CommunityService;
