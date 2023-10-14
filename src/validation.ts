import type { LiteralUnion } from "type-fest";

import { fastestValidatorResolver } from "./resolvers/fastest-validator";
import { joiResolver } from "./resolvers/joi";
import { yupResolver } from "./resolvers/yup";
import { zodResolver } from "./resolvers/zod";
import { valibotResolver } from "./resolvers/valibot";

export type SCHEMA_TYPE = LiteralUnion<
  | "Yup"
  | "FastestValidator"
  | "Joi"
  | "Zod",
  | "Valibot"
  | string
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
    case "Valibot":
      return valibotResolver(schema);


    default:
      throw new Error(`Does not support ${type} validation yet!`);
  }
}
