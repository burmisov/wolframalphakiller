const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'postgres',
  database: 'wolframalphakiller',
  password: 'postgres',
  port: 5432,
});

export default client;
