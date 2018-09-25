import express from 'express';
import bodyParser from 'body-parser';
import calc from './calc';

const app: express$Application = express();

app.use(bodyParser.json());
app.use('/api/calc', calc);

app.listen(8888, '0.0.0.0');
