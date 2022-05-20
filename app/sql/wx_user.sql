CREATE TABLE IF NOT EXISTS `wx_user` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `wx_user_id` varchar(255) NOT NULL,
  `username` varchar(18) NOT NULL,
  `password` varchar(20) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `create_time` datetime,
  `update_time` datetime,
  `avatar_url` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;