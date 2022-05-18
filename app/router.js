'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/user/login', controller.user.login);
  router.get('/user/getUser', controller.user.getUser);
  router.post('/user/addUser', controller.user.addUser);
};
