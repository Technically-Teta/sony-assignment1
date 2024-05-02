// server/db/db-connection.js;
const { Pool } = require('pg');
const db = new Pool({
  connectionString: 'postgres://localhost:5433/sonyassignment'
});

module.exports = db;