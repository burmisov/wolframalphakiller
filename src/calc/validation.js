export const ArraySqrtSchema = {
  type: 'object',
  required: ['numbers'],
  properties: {
    numbers: {
      type: 'array',
      items: {
        type: 'number',
        minimum: 0,
      },
    },
  },
};

export const DivisionSchema = {
  type: 'object',
  required: ['divisible', 'divisor'],
  properties: {
    divisible: {
      type: 'number',
    },
    divisor: {
      type: 'number',
    },
  },
};
