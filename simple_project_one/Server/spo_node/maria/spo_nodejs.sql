CREATE SCHEMA spo_nodejs;
USE spo_nodejs;
CREATE TABLE users(
	email_id VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL,
	hash_id CHAR(128) NOT NULL,
	nickname VARCHAR(15) NOT NULL,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	deleted_at DATETIME NULL,
	PRIMARY KEY(email_id),
	UNIQUE KEY uk_hash_id (hash_id),
	UNIQUE KEY uk_nickname (nickname)
)
COMMENT = 'user info'
ENGINE = INNODB;
DESC users;
SELECT * FROM users;
