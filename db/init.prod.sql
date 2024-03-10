CREATE TABLE IF NOT EXISTS `dines` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(60) NOT NULL,
    `price` float(11) NOT NULL,
    `description` varchar(180) NOT NULL,
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password_hash` varchar(200) NOT NULL,
  `admin` boolean NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;