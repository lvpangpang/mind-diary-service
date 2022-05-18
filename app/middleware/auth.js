module.exports = (options, app) => {
  return async function auth(ctx, next) {
    const { url } = ctx.request;
    const publicRoutes = app.config.publicRoutes;
    // 判断如果是不需要鉴权路由则直接放行
    if (publicRoutes.indexOf(url.split("?")[0]) !== -1) {
      await next();
    } else {
      // 获取请求token
      const token = ctx.request.headers.token || "";
      if (token) {
        const jwtInfo = await app.jwt.verify(token, app.config.jwt.secret);
        ctx.state.userId = jwtInfo.userId;
        const userTokenInfo = await app.mysql.query(
          `select * from user_token where user_id=${ctx.state.userId}`
        );
        if (userTokenInfo[0]) {
          const userToken = userTokenInfo[0].token;
          if (userToken !== token) {
            ctx.response.body = {
              code: 401,
              msg: "登录信息失效",
            };
          } else {
            await next();
          }
        } else {
          ctx.response.body = {
            code: 401,
            msg: "登录信息失效",
          };
        }
      } else {
        ctx.response.body = {
          code: 401,
          msg: "登录失败",
        };
      }
    }
  };
};
