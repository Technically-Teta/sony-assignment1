// server/db/db-connection.js;
//onst { Pool } = pg;
const { Pool } = require('pg');
const db = new Pool({
  connectionString: 'postgres://localhost:5433/sonyassignment'
});

module.exports = db;