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

