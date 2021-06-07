SELECT lng, lat FROM addresses JOIN users ON addresses.user_id = users.id WHERE users.seller = true AND addresses.default_address = true;

SELECT * FROM users AS u JOIN orders AS o ON u.id = o.user_id JOIN order_details AS od ON o.id = od.order_id JOIN item AS i ON i.id = od.item_id WHERE u.id = 1;

SELECT * FROM buyer_seller AS bs JOIN orders AS o ON o.id = bs.order_id JOIN order_details AS od ON o.id = od.order_id JOIN item AS i ON bs.item_id = i.id WHERE bs.buyer = 2;

SELECT * FROM item AS i JOIN users AS u ON i.user_id = u.id JOIN addresses AS a ON a.user_id = u.id WHERE i.id = 3;