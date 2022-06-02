CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `community_id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `reply_id` varchar(255),
  `reply_name` varchar(255),
  `content` longtext NOT NULL,
  `create_time` datetime,
  `update_time` datetime
) ENGINE=InnoDB DEFAULT CHARSET=utf8;