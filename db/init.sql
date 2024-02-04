CREATE TABLE IF NOT EXISTS `dines` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(60) NOT NULL,
    `price` float(11) NOT NULL,
    `description` varchar(180) NOT NULL,
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO `dines` (`name`, `price`, `description`)
VALUES ('Mac & Cheese', 8.99, 'Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.');
INSERT INTO `dines` (`name`, `price`, `description`)
VALUES ('Caesar Salad', 12.99, 'Romaine lettuce tossed in Caesar dressing, topped with croutons and parmesan shavings.');
INSERT INTO `dines` (`name`, `price`, `description`)
VALUES ('Margherita Pizza', 10.99, 'A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.');