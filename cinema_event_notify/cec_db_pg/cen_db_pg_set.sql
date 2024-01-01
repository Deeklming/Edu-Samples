CREATE DATABASE cec_db;
CREATE TABLE cec_event_table(
    id INTEGER NOT NULL PRIMARY KEY,
    cinema VARCHAR(15) NOT NULL,
    groups VARCHAR(30) NOT NULL,
    title TEXT NOT NULL,
    dates DATE[],
    dday INTEGER NOT NULL,
    urls TEXT NOT NULL
);

SELECT * FROM cec_event_table;

ALTER TABLE cec_event_table
ALTER COLUMN cinema TYPE VARCHAR(15),
ALTER COLUMN groups TYPE VARCHAR(30);

INSERT INTO cec_event_table VALUES(
    default, 'lotte', '영화', '타이틀임', '{2022.06.25, 2022.06.25}', 999, 'http://www.naver.com'
);

TRUNCATE TABLE cec_event_table RESTART IDENTITY;

DELETE FROM cec_event_table WHERE cinema = 'lotte';

\c 스키마;
\d 테이블명;

INSERT INTO cec_event_table VALUES(
    999, 'lotte', '영화', '타이틀임', '{}', 999, 'http://www.naver.com'
);

TRUNCATE TABLE cec_event_table CASCADE;
