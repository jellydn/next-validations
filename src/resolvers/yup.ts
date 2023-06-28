import * as Yup from 'yup';

export function yupResolver<T extends Yup.AnyObjectSchema>(schema: T) {
  return {
    validate: (data: unknown) => schema.validateSync(data),
  };
}
