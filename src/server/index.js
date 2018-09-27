import express from 'express';
import bodyParser from 'body-parser';
import calc from './calc';
import { expressLogger, expressErrorLogger } from './logging';
import db from './db';

const app: express$Application = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(expressLogger);
}

app.use('/api/calc', calc);

app.use((error, request, response, next) => {
  if (error) {
    response.status(501).json({
      error: true,
      message: 'internal server error',
    });
  } else {
    next();
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.use(expressErrorLogger);
}

app.listen(8888, '0.0.0.0', async () => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  try {
    await db.connect();
  } catch (err) {
    console.error('unable to connect to database', err);
    process.exit(1);
  }

  try {
    await db.query(
      'create table if not exists logs (level varchar(80) not null, message varchar not null);',
    );
  } catch (err) {
    console.error('failed to create logs table', err);
    process.exit(1);
  }
});

export default app;
