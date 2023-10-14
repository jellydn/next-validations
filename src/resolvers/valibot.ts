import { parse } from 'valibot'
import type v from 'valibot'

export function valibotResolver<T extends v.AnySchema>(schema: T) {
  return {
    validate(data: unknown) {
      return parse(schema, data)
    },
  };
}
