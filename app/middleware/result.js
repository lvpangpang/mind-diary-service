module.exports = () => {
  return async function resultHandler(ctx, next) {
    try {
      const result = await next();
      if (result) {
        if (typeof result === "string") {
          ctx.response.body = {
            code: 400,
            msg: result,
          };
        } else {
          const { data, msg, code } = result || {};
          ctx.response.body = {
            code: code || 200,
            data: data || null,
            msg: msg || "ok",
          };
        }
      }
    } catch (err) {
      const { app } = ctx;
      app.emit("error", err, ctx);
      const status = err.status || 200;
      const errorMsg =
        status === 500 && app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;
      ctx.body = { code: 500, msg: errorMsg };
      ctx.status = status;
    }
  };
};
