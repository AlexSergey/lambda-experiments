import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import httpResponseSerializer from '@middy/http-response-serializer';
import { transpileSchema } from '@middy/validator/transpile';
import cors from '@middy/http-cors';

const processPayment = async (event, context) => {
  const {
    creditCardNumber,
    expiryMonth,
    expiryYear,
    cvc,
    nameOnCard,
    amount
  } = event.body;

  console.log(creditCardNumber, amount);

  return {
    statusCode: 200,
    body: { result: 'success', message: 'payment processed correctly' }
  }
}

const eventSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        creditCardNumber: {
          type: 'string',
          minLength: 12,
          maxLength: 19,
          pattern: '^[1-9]+'
        },
        expiryMonth: {
          type: 'integer',
          minimum: 1,
          maximum: 12
        },
        expiryYear: {
          type: 'integer',
          minimum: 2020,
          maximum: 2027
        },
        cvc: {
          type: 'string',
          minLength: 3,
          maxLength: 4,
          pattern: '^[1-9]+'
        },
        nameOnCard: { type: 'string' },
        amount: { type: 'number' }
      },
      required: ['creditCardNumber']
    }
  }
}

const handler = middy(processPayment)
  .use(jsonBodyParser())
  .use(httpResponseSerializer({
    serializers: [
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body)
      },
      {
        regex: /^text\/plain$/,
        serializer: ({ body }) => body
      }
    ],
    defaultContentType: 'application/json'
  }))
  .use(validator({ eventSchema: transpileSchema(eventSchema) }))
  .use(cors())
  .use(httpErrorHandler());

export { handler };
