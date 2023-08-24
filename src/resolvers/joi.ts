import type Joi from 'joi';

export function joiResolver<T extends Joi.AnySchema>(schema: T) {
  return {
    validate(data: unknown) {
      const { error, warning } = schema.validate(data);
      if (error) {
        throw error;
      }

      if (warning) {
        throw warning;
      }

      return true;
    },
  };
}
