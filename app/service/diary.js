"use strict";
const { Service } = require("egg");
const moment = require("moment");

class DiaryService extends Service {
  async add({ userId, content }) {
    const { app } = this;
    const { mysql } = app;
    await mysql.query(
      `insert into diary (user_id, content, create_time) values('${userId}', '${content}', '${moment(
        new Date()
      ).format("YYYY-MM-DD HH:mm:ss")}')`
    );
    return {}
  }
}

module.exports = DiaryService;
