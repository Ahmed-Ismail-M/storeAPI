CREATE TABLE products(name VARCHAR(100), category VARCHAR(50), price decimal(2),  id SERIAL PRIMARY KEY);
CREATE TABLE users(first_name VARCHAR(50), last_name VARCHAR(50), password VARCHAR(50),  id SERIAL PRIMARY KEY);
CREATE TABLE orders( product_id INT NOT NULL, user_id INT NOT NULL, status VARCHAR(20), id SERIAL PRIMARY KEY, 
CONSTRAINT fk_product
      FOREIGN KEY(product_id) 
	  REFERENCES products(id) ON DELETE CASCADE,
CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id) ON DELETE CASCADE
      );