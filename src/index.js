import express from 'express';
import bodyParser from 'body-parser';
import calc from './calc';
import { expressLogger, expressErrorLogger } from './logging';
import db from './db';

const app: express$Application = express();

app.use(bodyParser.json());
app.use(expressLogger);
app.use('/api/calc', calc);
app.use(expressErrorLogger);

app.listen(8888, '0.0.0.0', async () => {
  try {
    await db.connect();
  } catch (err) {
    throw new Error('unable to connect to database');
  }

  try {
    await db.query(
      'create table if not exists logs (level varchar(80) not null, message varchar);',
    );
  } catch (err) {
    throw new Error('failed to create logs table');
  }
});
