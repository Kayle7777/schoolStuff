DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(5,2),
    stock_quantity INTEGER(10) DEFAULT 0
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Chips", "Snacks", 1.5, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Lettuce", "Produce", 0.3, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Ground Beef", "Meat", 3, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Fresh Salmon", "Fish", 6, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Toilet Paper", "Cleaning Supplies", 3.5, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Bleach", "Cleaning Supplies", 3.5, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Laundry Detergent", "Cleaning Supplies", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Candy", "Snacks", 1, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Shrimp", "Fish", 4, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Pork Sausage", "Meat", 2, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Corn", "Produce", 0.5, 30);
