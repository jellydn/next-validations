import { yupResolver } from './resolvers/yup';

export type SCHEMA_TYPE =
  | 'Yup'
  | 'Zod'
  | 'SuperStruct'
  | 'Joi'
  | 'Vest'
  | 'ClassValidator'
  | 'IoTS'
  | 'Nope';

export function createResolver(type: SCHEMA_TYPE, schema: any) {
  switch (type) {
    case 'Yup':
      return yupResolver(schema);

    default:
      throw new Error(`Does not support ${type} validation yet!`);
  }
}
