export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

export const VALIDATION_PIPE_OPTIONS = {
  whitelist: true, // Strip properties that do not have any decorators
  forbidNonWhitelisted: true, // Throw errors if non-whitelisted values are provided
  transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  disableErrorMessages: false, // Optionally, turn off error messages
  errorHttpStatusCode: 422, // Set the HTTP status code to 422 for validation errors
  stopAtFirstError: false, // Continue validating properties after the first validation error is found
  enableDebugMessages: true, // Enable debug messages in the validation errors
  transformOptions: {
    enableImplicitConversion: true, // Automatically convert primitive types
    exposeDefaultValues: true, // Expose default values in the resulting DTO instances
  },
};
