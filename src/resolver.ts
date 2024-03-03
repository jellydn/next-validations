import { assert, type Infer, type Schema } from '@typeschema/main';

export function typeschemaResolver<T extends Schema>(schema: T) {
  return {
    async validate(data: unknown): Promise<Infer<T>> {
      return assert(schema, data);
    },
  };
}
