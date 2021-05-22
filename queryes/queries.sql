SELECT lng, lat FROM addresses JOIN users ON addresses.user_id = users.id WHERE users.seller = true AND addresses.default_address = true;

SELECT * FROM users AS u JOIN orders AS o ON u.id = o.user_id JOIN order_details AS od ON o.id = od.order_id JOIN item AS i ON i.id = od.item_id WHERE u.id = 1;