// server/db/db-connection.js;
import pg from 'pg';
const { Pool } = pg;
const db = new Pool({
  connectionString: 'postgres://localhost:5433/sonyassignment'
});

export default db;