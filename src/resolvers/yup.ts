
import * as Yup from 'yup';
import type Lazy from 'yup/lib/Lazy';

export function yupResolver<T extends Yup.AnyObjectSchema | Lazy<any>>(schema:T) {
    return {
        validate: (data: unknown) => schema.validateSync(data),
    }
}
