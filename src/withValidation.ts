import { NextApiRequest, NextApiResponse } from 'next';

import { createResolver, SCHEMA_TYPE } from './validation';

type NextHandler = (err?: Error) => void;

type ValidationHoF = {
  type: SCHEMA_TYPE;
  mode?: 'body' | 'query' | 'headers';
  schema: unknown;
};

export function withValidation({
  type,
  schema,
  mode = 'query',
}: ValidationHoF) {
  return (handler: (req: NextApiRequest, res: NextApiResponse<any>) => any) => {
    return async (
      req: NextApiRequest,
      res: NextApiResponse,
      next?: NextHandler
    ) => {
      try {
        const resolver = createResolver(type, schema);

        resolver.validate(req[mode]);

        if (!!next) {
          return next();
        }

        return handler(req, res);
      } catch (error) {
        res.status(400).send(error);
      }
    };
  };
}
