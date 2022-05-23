"use strict";
const { Controller } = require("egg");

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const { code, nickName, avatarUrl } = ctx.request.body;
    ctx.assert(code, "code不能为空");
    ctx.assert(nickName, "nickName不能为空");
    ctx.assert(avatarUrl, "avatarUrl不能为空");

    const { data } = await ctx.curl(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wxc9ea0ad7367a0851&secret=3c795206ff3085d0fdaab6fcc00d0e5e&js_code=${code}&grant_type=authorization_code`,
      {
        dataType: "json",
      }
    );
    const { openid, errmsg } = data;
    if (openid) {
      const result = await ctx.service.user.login({
        userId: openid,
        nickName,
        avatarUrl,
      });
      return result;
    } else {
      return {
        code: 401,
        msg: errmsg,
      };
    }
  }

  async getUser() {
    const { ctx } = this;
    const token = ctx.request.headers.token;
    ctx.assert(token, "token不能为空");
    const data = await ctx.service.user.getUser(token);
    return data;
  }
}

module.exports = UserController;
