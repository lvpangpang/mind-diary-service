"use strict";

module.exports = (app) => {
  const { router, controller, io } = app;
  router.post("/login", controller.user.login);
  router.get("/user/getUser", controller.user.getUser);

  router.get("/diary/get", controller.diary.get);
  router.post("/diary/add", controller.diary.add);

  router.get("/community/get", controller.community.get);
  router.get("/community/getOne", controller.community.getOne);
  router.post("/community/add", controller.community.add);

  router.get("/comment/get", controller.comment.get);
  router.post("/comment/add", controller.comment.add);

  router.post("/upload", controller.upload.upload);

  io.of("/io").route("msg", io.controller.chat.message);
};
