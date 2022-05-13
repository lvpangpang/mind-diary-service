module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      const { data, msg } = await next();
      if (data) {
        ctx.response.body = {
          code: 200,
          data,
          msg: msg || "ok",
        };
      }
    } catch (err) {
      const { app } = ctx;

      app.emit("error", err, ctx);

      const status = err.status || 200;
      const errorMsg =
        status === 500 && app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;

      // 仅供参考，需按自己的业务逻辑处理。
      ctx.body = { code: 500, msg: errorMsg };
      ctx.status = status;
    }
  };
};
