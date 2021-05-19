DROP DATABASE IF EXISTS farm_fresh;

CREATE DATABASE farm_fresh;

\c farm_fresh;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(150) NOT NULL,
    default_address VARCHAR(250) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    seller BOOLEAN DEFAULT FALSE,
    date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE rating_comments(
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    rating INTEGER NOT NULL,
    comment TEXT,
    date TIMESTAMP
);

CREATE TABLE addresses(
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    street_address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    lng FLOAT,
    lat FLOAT
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY ,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    order_date TIMESTAMP
);

CREATE TABLE item(
    id INTEGER PRIMARY KEY ,
    type TEXT,
    name TEXT,
    waigth FLOAT,
    price FLOAT,
    date TIMESTAMP,
    details TEXT
);