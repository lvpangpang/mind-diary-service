CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone` varchar(11),
  `create_time` datetime,
  `update_time` datetime,
  `avatar_url` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;