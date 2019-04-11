-- Used for Seeding database with information

DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price FLOAT(7,2) NOT NULL,
  stock_quantity INT  NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("slippers","clothing", 5.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("smartphone","electronics", 300.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bananas","food", 10.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("screwdriver","tools", 12.50, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee mug","kitchen", 5.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("usbc charger","electronics", 15.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sous vide cooker","kitchen", 400, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gucci sweatshirt","clothing", 1000.25, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wood screws","tools", 1.25, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skateboard","sports", 50.50, 10);

SELECT * FROM products;