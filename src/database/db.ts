const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin-master',
  password: 'pLc29#d45X8@7T',
  host: 'localhost',
  port: 5432,
  database: 'admin-master'
});

module.exports = {
  query: async (query, values) => {
    const client = await pool.connect();

    try {
      const result = await client.query(query, values);
      return result;
    } finally {
      client.release();
    }
  },
};
