# POSTGRESQL
## sql연습
```sql
select -- window 함수 rank(), partition by
	id, first_name, last_name, country, age,
	rank() over( partition by country order by age ) as rank_number_in_country
from users
where id between 1 and 20
order by country, age;

select -- dense_rank() 공통순위도 포함, row_number() 그냥 순위 매김
	id, first_name, last_name, country, age,
	dense_rank() over( order by age ) as rank_number_in_country
from users
where id between 1 and 20
order by age;

create table weniv_product -- table 생성
(
    id   serial primary key,
    name varchar(30) null,
    cost int         null
);

INSERT INTO weniv_product (id, name, cost) VALUES (1, 'desk', 200000); -- 데이터 삽입
INSERT INTO weniv_product VALUES (2, 'monitor', 500000);
INSERT INTO weniv_product (id, name, cost) VALUES
(3, 'calender', 30000),
(4, 'pen', 1000),
(5, 'chair', 50000),
(6, 'bookshelf', 70000),
(7, 'wristband', 300),
(8, 'laptop case', 30000),
(9, 'sticker', 2500),
(10, 'key ring', 3500);

select * from weniv_product;

UPDATE weniv_product -- 데이터 수정
SET cost = 210000 
WHERE id = 1;

UPDATE weniv_product
SET cost = 190000, name='new monitor' 
WHERE id = 2;

UPDATE weniv_product -- 데이터 여러개 수정
SET cost = cost + 500 
WHERE cost < 1000;

DELETE FROM weniv_product -- 데이터 삭제
WHERE id = 10;


DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
	customer_id serial PRIMARY KEY,
	name VARCHAR UNIQUE,
	email VARCHAR NOT NULL,
	active bool NOT NULL DEFAULT TRUE
);
INSERT INTO
    customers (name, email)
VALUES
    ('IBM', 'contact@ibm.com'),
    ('Microsoft', 'contact@microsoft.com'),
    ('Intel', 'contact@intel.com');

INSERT INTO customers (name, email) -- upsert, name이 존재하면 update, 존재 시 아무것도 하지 않을땐 DO NOTHING
VALUES('Microsoft','hotline@microsoft.com')
ON CONFLICT (name)
DO
	UPDATE SET email = EXCLUDED.email || ';' || customers.email;
```
