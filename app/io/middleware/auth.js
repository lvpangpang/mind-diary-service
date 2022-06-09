module.exports = () => {
  return async function auth(ctx, next) {
    // ctx.socket.emit("res", "packet received!");
    await next();
  };
};
