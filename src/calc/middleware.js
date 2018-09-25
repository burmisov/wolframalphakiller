import { Validator, ValidationError } from 'express-json-validator-middleware';

const validator = new Validator({ allErrors: false, coerceTypes: true });

const constructErrorMessage = errors =>
  Object.entries(errors).reduce(
    (obj, [name, errors]) => ({
      ...obj,
      [name]: errors.reduce((nestedObj, { keyword, dataPath, message }) => {
        if (keyword === 'required') {
          return {
            ...nestedObj,
            [missingProperty]: keyword,
          };
        }
        return {
          ...nestedObj,
          [dataPath.slice(1)]: message,
        };
      }, {}),
    }),
    {},
  );

export const catchValidationError = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    response.status(400).json({
      error: true,
      ...constructErrorMessage(error.validationErrors),
    });
  } else if (error.name == 'division_by_zero') {
    response.status(400).json({
      error: true,
      message: error.message,
    });
  } else {
    next(error);
  }
};

export const { validate } = validator;
