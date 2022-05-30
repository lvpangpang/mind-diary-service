CREATE TABLE IF NOT EXISTS `community` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `create_time` datetime,
  `update_time` datetime
) ENGINE=InnoDB DEFAULT CHARSET=utf8;