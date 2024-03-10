CREATE TABLE IF NOT EXISTS `dines` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(60) NOT NULL,
    `price` float(11) NOT NULL,
    `description` varchar(180) NOT NULL,
    `image` varchar(200),
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO `dines` (`name`, `price`, `description`, `image`)
VALUES (
  'Mac & Cheese',
   8.99,
  'Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.',
  'http://localhost:5000/images/mac-and-cheese.jpg'
  );
INSERT INTO `dines` (`name`, `price`, `description`, `image`)
VALUES (
  'Caesar Salad',
   12.99,
  'Romaine lettuce tossed in Caesar dressing, topped with croutons and parmesan shavings.',
  'http://localhost:5000/images/caesar-salad.jpg'
  );
INSERT INTO `dines` (`name`, `price`, `description`, `image`)
VALUES (
  'Margherita Pizza',
  10.99,
  'A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.',
  'http://localhost:5000/images/margherita-pizza.jpg'
  );

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