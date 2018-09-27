const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'wolframalphakiller',
  password: 'postgres',
  port: 5432,
});

export default client;
