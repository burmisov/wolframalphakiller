import { Validator, ValidationError } from 'express-json-validator-middleware';

const validator = new Validator({ allErrors: false, coerceTypes: true });

function constructErrorMessage(errorsObject) {
  function reduceErrors(nestedObj, error) {
    const {
      keyword,
      dataPath,
      message,
      params: { missingProperty },
    } = error;

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
  }

  return Object.entries(errorsObject).reduce(
    (obj, [name, errors]) => ({
      ...obj,
      [name]: errors.reduce(reduceErrors, {}),
    }),
    {},
  );
}

export const catchValidationError = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    response.status(400).json({
      error: true,
      ...constructErrorMessage(error.validationErrors),
    });
    next();
  } else if (error.name === 'division_by_zero') {
    response.status(400).json({
      error: true,
      message: error.message,
    });
    next();
  } else {
    next(error);
  }
};

export const { validate } = validator;
