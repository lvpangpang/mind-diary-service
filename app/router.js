"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  router.post("/login", controller.user.login);
  router.get("/user/getUser", controller.user.getUser);

  router.get("/diary/get", controller.diary.get);
  router.post("/diary/add", controller.diary.add);

  router.post("/upload", controller.upload.upload);

};
