-- Active: 1663621767455@@35.226.146.116@3306@alves-andressa-darze
create table if not exists Shopper_Orders (
    id varchar(255) primary key,
    name varchar(255) not null,
    delivery_date DATE not null
);

create table if not exists Shopper_Products (
    id varchar(255) primary key,
    name varchar(255) not null unique,
    price decimal(3,2) not null,
    qty_stock smallint not null
);

create table if not exists Shopper_Orders_Products (
    order_id varchar(255) not null,
    product_id varchar(255) not null,
    quantity smallint not null,
    foreign key (order_id) references Shopper_Orders(id),
    foreign key (product_id) references Shopper_Products(id)
);

select * from Shopper_Products;
select * from `Shopper_Orders`;
select * from `Shopper_Orders_Products`;

-- select * from `Shopper_Orders`
-- join `Shopper_Orders_Products` on Shopper_Orders_Products.order_id = Shopper_Orders.id
-- join `Shopper_Products` on Shopper_Orders_Products.product_id = Shopper_Products.id;

select o.id, o.name as user_name, o.delivery_date, u.product_id, u.quantity, i.name as product_name, i.price 
from `Shopper_Orders` as o
join `Shopper_Orders_Products` as u on u.order_id = o.id
join `Shopper_Products` as i on u.product_id = i.id;

select u.product_id, u.quantity, i.name as product_name, i.price 
from `Shopper_Orders` as o
join `Shopper_Orders_Products` as u on u.order_id = o.id
join `Shopper_Products` as i on u.product_id = i.id
where o.id = "30f400b9-3952-4882-bef6-8fee059353f4";


