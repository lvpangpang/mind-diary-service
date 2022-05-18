CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(18) NOT NULL,
  `password` varchar(20) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `create_time` datetime,
  `update_time` datetime,
  `avatar_url` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;