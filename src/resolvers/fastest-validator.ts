/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
export function fastestValidatorResolver<T>(schema: T) {
  const Validator = require('fastest-validator');
  const validator = new Validator();
  const check = validator.compile(schema);

  return {
    validate(data: unknown): true | any[] {
      const result = check(data);
      if (Array.isArray(result)) {
        throw new Error('Validation failed', {
          cause: result,
        });
      }

      return result;
    },
  };
}
