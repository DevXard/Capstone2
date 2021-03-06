DROP DATABASE IF EXISTS farm_fresh;

CREATE DATABASE farm_fresh;

\c farm_fresh;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    seller BOOLEAN DEFAULT FALSE,
    date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE token (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    token TEXT NOT NULL
);

CREATE TABLE rating_comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    rating INTEGER NOT NULL,
    comment TEXT,
    date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE addresses(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    street_address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    lng FLOAT,
    lat FLOAT,
    default_address BOOLEAN
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    order_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE item(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    type TEXT,
    name TEXT,
    quantity FLOAT,
    price FLOAT,
    details TEXT,
    date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE buyer_seller (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders ON DELETE CASCADE,
    item_id INTEGER REFERENCES item ON DELETE CASCADE,
    buyer INTEGER REFERENCES orders ON DELETE CASCADE,
    seller INTEGER REFERENCES item ON DELETE CASCADE,
    ordered BOOLEAN DEFAULT FALSE,
    intransit BOOLEAN DEFAULT FALSE,
    delivered BOOLEAN DEFAULT FALSE
);

CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    order_Id INTEGER REFERENCES orders ON DELETE CASCADE,
    item_id INTEGER REFERENCES item ON DELETE CASCADE,
    quantity FLOAT
);