import Validator, { ValidationError } from 'fastest-validator';

function createValidator<T>(schema: T) {
  const validator = new Validator();
  return validator.compile(schema);
}

export function fastestValidatorResolver<T>(schema: T) {
  return {
    validate: (data: unknown): true | ValidationError[] => {
      const check = createValidator(schema);
      const result = check(data);
      if (Array.isArray(result)) {
        throw result;
      }

      return result;
    },
  };
}
