CREATE TABLE IF NOT EXISTS `user_token`(
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `create_time` datetime,
  `update_time` datetime
)ENGINE=InnoDB DEFAULT CHARSET=utf8;