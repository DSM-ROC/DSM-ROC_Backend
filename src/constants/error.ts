export const commonError = {
  notFound: {
    statusCode: 404,
    message: 'Not Found',
  },
  forbidden: {
    statusCode: 403,
    message: 'Forbidden',
  },
  conflict: {
    statusCode: 409,
    message: 'already exist',
  },
  wrong: {
    statusCode: 500,
    message: 'Something went very wrong!!!',
  },
  unauthorized: {
    statusCode: 401,
    message: 'Unauthorized',
  },
  tooLarge: {
    statusCode: 413,
    message: 'Payload too large',
  },
  badRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  unexpectedField: {
    statusCode: 400,
    message: 'Unexpected field',
  },
  invalidQuery: {
    statusCode: 400,
    message: 'Invalid query parameters',
  },
  invalidPathParams: {
    statusCode: 400,
    message: 'Invalid path parameters',
  },
  invalidState: {
    statusCode: 422,
    message: 'Invalid state',
  },
};
