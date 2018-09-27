import express from 'express';
import { validate, catchValidationError } from './middleware';
import { ArraySqrtSchema, DivisionSchema } from './validation';

const app = express.Router();

app.get(
  '/divide',
  validate({ query: DivisionSchema }),
  (request: express$Request, response: express$Response) => {
    const { divisible, divisor } = request.query;

    if (divisor === 0) {
      const error = new Error("divisor can't be 0"); // !
      error.name = 'division_by_zero';

      throw error;
    }

    return response.json({
      result: divisible / divisor,
    });
  },
);

app.post(
  '/sqrt',
  validate({ body: ArraySqrtSchema }),
  (request: express$Request, response: express$Response) => {
    const { numbers } = request.body;

    // for error logging
    if (numbers.length > 10) {
      throw new Error('test error for logging');
    }
    return response.json({
      result: numbers.map(Math.sqrt),
    });
  },
);

app.use(catchValidationError);

export default app;
