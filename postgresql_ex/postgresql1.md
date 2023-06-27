# POSTGRESQL
## sql연습
```sql
select 'hi' || 'hi'; -- 문자열 합치기
select concat('hi','2hi'); -- 문자열 합치기
select 1+1; -- 기본 연산

select * from users; -- 전체 선택
select id, concat(first_name, ' ', last_name), email, country from users;

select id, category, name, retail_price, cost from products;
select id, category, name, retail_price, cost, (retail_price - cost) as profit from products; -- as 별칭
select * from products limit 5; -- 개수 제한

select distinct city from users; -- 중복 제거
select distinct country, city from users; -- 묶어서 중복 제거

select distinct status from orders;
select distinct category from products;
select distinct category as product_category, brand as product_brand from products limit 30;

select
	id as product_id,
	category as product_category,
	name as product_name,
	retail_price as product_price,
	cost as product_cost,
	(retail_price - cost) as product_profit,
	(retail_price - cost) / cost * 100 as product_profit_rate
	from products;
```
