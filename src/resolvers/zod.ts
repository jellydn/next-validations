import { z } from 'zod';

export function zodResolver<T extends z.ZodAny>(schema: T) {
  return {
    validate: (data: unknown) => schema.parse(data),
  };
}
