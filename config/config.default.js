'use strict';

module.exports = appInfo => {

  const config = exports = {};
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'lvfeifei',
    },
    app: true,
    agent: false,
  };

  config.keys = appInfo.name + '_1652350446420_1606';

  config.middleware = [ 'result' ];

  return {
    ...config,
  };
};
