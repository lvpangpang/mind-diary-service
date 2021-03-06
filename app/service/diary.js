"use strict";
const { Service } = require("egg");
const moment = require("moment");

class DiaryService extends Service {
  async get({ pageIndex = 1, userId }) {
    const { app } = this;
    const { mysql } = app;
    const pageSize = 1000;
    const data = await mysql.query(
      `select * from diary order by create_time DESC  limit ${
        (pageIndex - 1) * pageSize
      }, ${pageSize}`
    );
    const total = await mysql.query(`select count(*) from diary`);
    let num = 0;
    const temp = {};
    data.forEach((item) => {
      item["create_time"] = moment(item["create_time"]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      let itemTemp = item["create_time"].split(" ")[0];
      if (!temp[itemTemp]) {
        num++;
        temp[itemTemp] = 1;
      }
    });

    return {
      data: {
        list: data,
        total: total[0]["count(*)"],
        pageIndex,
        num
      },
    };
  }

  async add({ userId, content }) {
    const { app } = this;
    const { mysql } = app;
    await mysql.query(
      `insert into diary (user_id, content, create_time) values('${userId}', '${content}', '${moment(
        new Date()
      ).format("YYYY-MM-DD HH:mm:ss")}')`
    );
    return {};
  }
}

module.exports = DiaryService;
