import Validator, { ValidationError } from 'fastest-validator';

export function fastestValidatorResolver<T>(schema: T) {
  const validator = new Validator();
  const check = validator.compile(schema);

  return {
    validate: (data: unknown): true | ValidationError[] => {
      const result = check(data);
      if (Array.isArray(result)) {
        throw result;
      }

      return result;
    },
  };
}
