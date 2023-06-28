# POSTGRESQL
## sql연습
```sql
select * from products where category = 'Swim'; -- 조건 추가
select id, cost, brand from products where brand = '2EROS';
select * from products where cost <= 30 and department = 'Men' limit 10;
select distinct category from products where retail_price >= 40;
select * from products where cost between 50 and 70; -- 이상, 이하
select * from products where name like '%Men%' and name like '%Sport%'; -- 문자열 포함, _는 갯수 제한, %는 갯수 제한 없음

select *, (cost/retail_price)*100 as sale_price from products
where brand != 'TYR'
and name like '%Suit%'
and (cost/retail_price)*100 >= 50;

select avg(age) from users; -- 평균
select avg(age) from users where gender = 'F';
select country, count(country) as country_user_count from users group by country; -- 그룹화, 데이터 쪼개기
select country, count(country) as country_user_count from users where gender = 'M' group by country;

select country, count(country) as country_user_count from users
where created_at between '2020-01-01' and '2020-02-01'
group by country;
select country, gender, count(country) as country_gender_user_count from users
where created_at >= '2020-01-01'
and created_at < '2020-02-01'
group by country, gender;

select distinct status from orders;
select user_id, sum(num_of_item) from orders
where created_at >= '2022-01-01'
and created_at < '2023-01-01'
and status = 'Returned'
group by user_id; 

select country, count(id) as user_count from users -- 그룹화 한 것에 필터와 정렬
group by country having count(id) >= 3000
order by user_count desc;
select * from products
where category = 'Sweaters'
and department  = 'Women'
order by retail_price
limit 5;
select brand, avg(retail_price) as retail_price_avg from products
where category = 'Sweaters'
and department  = 'Women'
group by brand
having avg(retail_price) <= 100
order by retail_price_avg;

select id, name, category, brand, cost, retail_price,
(retail_price-cost) as profit,
(retail_price-cost)/retail_price * 100 as profit_rate from products;
select brand,
min((retail_price-cost)/retail_price * 100) as min_profit_rate,
max((retail_price-cost)/retail_price * 100) as max_profit_rate,
avg((retail_price-cost)/retail_price * 100) as avg_profit_rate
from products
where category = 'Swim'
group by brand;
select brand,
avg((retail_price-cost)/retail_price * 100) as avg_profit_rate
from products
where category = 'Swim'
group by brand
order by avg_profit_rate desc
limit 5;

select id, name, round(retail_price, 2) from products; -- 반올림
select id, email, extract(year from created_at) as signup_year from users; -- 년도 추출
```
