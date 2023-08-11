import { NextApiRequest, NextApiResponse } from "next";

import { createResolver } from "./validation";
import type { SCHEMA_TYPE } from "./validation";

type NextHandler = (err?: Error) => void;

type ApiType = 'appRoute' | 'pageRoute';

type ValidationHoF = {
  type: SCHEMA_TYPE;
  mode?: "body" | "query" | "headers";
  schema: unknown;
  apiType?: ApiType;
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
    handler?: (req: NextApiRequest, res: NextApiResponse<any>) => any,
  ) => {
    return async (
      req: NextApiRequest,
      res: NextApiResponse,
      next?: NextHandler,
    ) => {
      try {
        validations.forEach((validation) => {
          const resolver = createResolver(validation.type, validation.schema);
          resolver.validate(req[validation.mode || "query"]);
        });

        if (!!next) {
          return next();
        }

        if (handler) return handler(req, res);

        const isAppRouter = validations.some((validation) => validation.apiType === 'appRoute');
        if (isAppRouter) {
          return NextResponse.next().status(404);
        } else {
          res.status(404).end();
        }
      } catch (error: any) {
        const isAppRouter = validations.some((validation) => validation.apiType === 'appRoute');
        if (isAppRouter) {
          return NextResponse.next().status(400).text(error.message);
        } else {
          res.status(400).send(error.message);
        }
      }
    };
  };
}