export function fastestValidatorResolver<T>(schema: T) {
  const Validator = require('fastest-validator');
  const validator = new Validator();
  const check = validator.compile(schema);

  return {
    validate: (data: unknown): true | any[] => {
      const result = check(data);
      if (Array.isArray(result)) {
        throw result;
      }

      return result;
    },
  };
}
