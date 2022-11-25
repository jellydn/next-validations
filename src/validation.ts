/* eslint-disable @typescript-eslint/naming-convention */
import type { LiteralUnion } from "type-fest";

import { fastestValidatorResolver } from "./resolvers/fastest-validator";
import { joiResolver } from "./resolvers/joi";
import { yupResolver } from "./resolvers/yup";
import { zodResolver } from "./resolvers/zod";

export type SCHEMA_TYPE = LiteralUnion<
  | "Yup"
  | "FastestValidator"
  | "Joi"
  | "Zod",
  string
>;

export function createResolver(type: SCHEMA_TYPE, schema: any) {
  switch (type) {
    case "Yup":
      return yupResolver(schema);
    case "FastestValidator":
      return fastestValidatorResolver(schema);
    case "Joi":
      return joiResolver(schema);
    case "Zod":
      return zodResolver(schema);

    default:
      throw new Error(`Does not support ${type} validation yet!`);
  }
}
