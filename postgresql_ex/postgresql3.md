# POSTGRESQL
## sql연습
```sql
select
extract(year from created_at) as year,
extract(month from created_at) as month,
count(order_id) as order_count
from orders
where extract(year from created_at) = 2020
group by year, month
order by year, month;

select order_id, gender, -- case when then end 구문
case 
	when gender = 'M' then '남성'
	when gender = 'F' then '여성'
end as gender_label
from orders
order by order_id;

select id,
to_char(created_at, 'YYYY') as year,
extract(month from created_at) as month,
extract(day from created_at) as day,
case traffic_source
	when 'Search' then '검색엔진'
	when 'Organic' then '검색결과'
	when 'Email' then '이메일'
	when 'Display' then '디스플레이 광고'
	when 'Facebook' then '페이스북'
end as traffic_source_label
from users
order by id;

select
to_char(created_at, 'YYYY') as year,
count(case traffic_source when 'Search' then 'o' end) as Search,
count(case traffic_source when 'Organic' then 'o' end) as Organic,
count(case traffic_source when 'Email' then 'o' end) as Email,
count(case traffic_source when 'Display' then 'o' end) as Display,
count(case traffic_source when 'Facebook' then 'o' end) as Facebook
from users
group by year
order by year;

select o.order_id,u.first_name, u.last_name, u.street_address, u.postal_code, u.city, u.country, o.num_of_item -- join
from orders o join users u on u.id = o.order_id
where u.country = 'United States'
and o.status = 'Processing'
order by o.order_id;

select u.country, count(o.order_id) as total_order_count
from orders o join users u on u.id = o.order_id
group by u.country
order by total_order_count desc;

select id, user_id, city, state, postal_code, browser, traffic_source, event_type from events e -- 서브쿼리
where user_id in (
	select user_id
	from events
	where event_type = 'purchase'
	group by user_id
	having count(id) >= 10
)
order by user_id;

with product_sales as 
(
    select 
        product_id,
        round(sum(sale_price), 3) as sum_sale_price,
        round(avg(sale_price), 3) as avg_sale_price,
        count(id)       as order_count
    from order_items t1
    group by product_id
)
select 
    g1.id as product_id,
    g1.name           as product_name,
    g2.sum_sale_price as product_total_sale_price,
    g2.avg_sale_price as product_avg_sale_price,
    g2.order_count    as product_order_count
from products g1
join product_sales g2 on g1.id = g2.product_id;
```
