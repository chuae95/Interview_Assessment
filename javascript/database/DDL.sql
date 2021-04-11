-- CREATE TABLE TEST (
--   name VARCHAR(30)
--   email VARCHAR(100)
-- )


-- INSERT INTO `school-administration-system`.`Students` (`name`, `email`) VALUES ('Chang', 'Email@emai.com');
-- INSERT INTO `school-administration-system`.`Students` (`name`, `email`) VALUES ('Song', '1234@emai.com');
-- INSERT INTO `school-administration-system`.`Students` (`name`, `email`) VALUES ('SongFa', '12345@emai.com');
CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(15) NOT NULL,
    password varchar(32) NOT NULL,
    followers int DEFAULT 0,
    following int DEFAULT 0,
    tweets int DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE following(Y

    id int NOT NULL AUTO_INCREMENT,
    user1_id int REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    user2_id int REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE tweets(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(15) NOT NULL,
    user_id int REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    tweet varchar(140) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
