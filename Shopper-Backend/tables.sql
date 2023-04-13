-- Active: 1663621767455@@35.226.146.116@3306@alves-andressa-darze
create table if not exists Shopper_Orders (
    id varchar(255) primary key,
    name varchar(255) not null,
    delivery_date DATE not null
);

create table if not exists Shopper_Products (
    id varchar(255) primary key,
    name varchar(255) not null unique,
    price decimal(19,4) not null,
    qty_stock smallint not null
);

create table if not exists Shopper_Orders_Products (
    order_id varchar(255) not null,
    product_id varchar(255) not null,
    quantity smallint not null,
    foreign key (order_id) references Shopper_Orders(id),
    foreign key (product_id) references Shopper_Products(id)
);

create table if not exists Shopper_Products_Images (
    product_id varchar(255) not null unique,
    image_url varchar(255) not null default("https://programada.shopper.com.br/static/img/logo.svg"),
    foreign key (product_id) references Shopper_Products(id)
);

create view vw_Shopper_Products as select p.id, p.name, p.price, p.qty_stock, i.image_url 
from `Shopper_Products` as p
join `Shopper_Products_Images` as i
on p.id = i.product_id;

select * from `vw_Shopper_Products`;

select * from `Shopper_Products`;
select * from `Shopper_Orders`;
select * from `Shopper_Orders_Products`;
select * from `Shopper_Products_Images`;

select o.id, o.name as user_name, o.delivery_date, u.product_id, u.quantity, i.name as product_name, i.price 
from `Shopper_Orders` as o
join `Shopper_Orders_Products` as u on u.order_id = o.id
join `Shopper_Products` as i on u.product_id = i.id;

select u.product_id, u.quantity, i.name as product_name, i.price 
from `Shopper_Orders` as o
join `Shopper_Orders_Products` as u on u.order_id = o.id
join `Shopper_Products` as i on u.product_id = i.id
where o.id = "30f400b9-3952-4882-bef6-8fee059353f4";

