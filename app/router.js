'use strict';

module.exports = app => {
  const { router, controller } = app;

  // 用户操作
  router.post('/user/login', controller.user.login);
  router.get('/user/getUser', controller.user.getUser);
  router.get('/user/getUserList', controller.user.getUserList);
  router.post('/user/addUser', controller.user.addUser);

  // 微信小程序用户操作
  router.post('/wxUser/login', controller.wxUser.login);
  router.get('/wxUser/getUser', controller.wxUser.getUser);
};
