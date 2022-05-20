module.exports = (options, app) => {
  return async function auth(ctx, next) {
    const { url } = ctx.request;
    const publicRoutes = app.config.publicRoutes;
    // 判断如果是不需要鉴权路由则直接放行
    if (publicRoutes.indexOf(url.split("?")[0]) !== -1) {
      await next();
    } else {
      // 获取请求token
      const token = ctx.request.headers.token;
      try {
        const jwtInfo = await app.jwt.verify(token, app.config.jwt.secret);
        ctx.state.userId = jwtInfo.userId;
        const userTokenInfo = await app.mysql.query(
          `select * from wx_user_token where user_id='${ctx.state.userId}' and token='${token}'`
        );
        if (userTokenInfo[0]) {
          await next();
        } else {
          ctx.response.body = {
            code: 401,
            msg: "登录信息失效",
          };
        }
      } catch {
        ctx.response.body = {
          code: 401,
          msg: "未登录",
        };
      }
    }
  };
};
