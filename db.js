const {Client} = require('pg');
const DB_URI = 'postgres:///farm_fresh'

const client = new Client(DB_URI);

client.connect();

module.exports = client;