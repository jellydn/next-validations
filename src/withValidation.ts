import { type NextApiRequest, type NextApiResponse } from "next";

import { createResolver } from "./validation";
import type { SCHEMA_TYPE } from "./validation";

type NextHandler = (err?: Error) => void;

type ValidationHoF = {
  type: SCHEMA_TYPE;
  mode?: "body" | "query" | "headers";
  schema: unknown;
};

export function withValidation({
  type,
  schema,
  mode = "query",
}: ValidationHoF) {
  return withValidations([{ type, schema, mode }]);
}

export function withValidations(validations: ValidationHoF[]) {
  return (
    handler?: (req: NextApiRequest, res: NextApiResponse) => any,
  ) => async (
    req: NextApiRequest,
    res: NextApiResponse,
    next?: NextHandler,
  ) => {
      try {
        validations.forEach((validation) => {
          const resolver = createResolver(validation.type, validation.schema);
          resolver.validate(req[validation.mode ?? "query"]);
        });

        if (next) {
          next(); return;
        }

        if (handler) return handler(req, res);

        res.status(404).end();
      } catch (error) {
        res.status(400).send(error);
      }
    };
}
