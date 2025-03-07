import type { Schema } from '@typeschema/main';
import type { NextApiRequest, NextApiResponse } from 'next';
import { typeschemaResolver } from './resolver';

type NextHandler = (err?: Error) => void;

interface NextApiRequestWithHeaders extends NextApiRequest {
  headers: {
    [key: string]: string | string[] | undefined;
  };
}

type ValidationHoF = {
  mode?: 'body' | 'query' | 'headers';
  schema: Schema;
};

export function withValidation({ schema, mode = 'query' }: ValidationHoF) {
  return withValidations([{ schema, mode }]);
}

export function withValidations(validations: ValidationHoF[]) {
  return (handler?: (req: NextApiRequest, res: NextApiResponse) => any) =>
    async (req: NextApiRequest, res: NextApiResponse, next?: NextHandler) => {
      try {
        await Promise.all(
          validations.map(async (validation) => {
            const resolver = typeschemaResolver(validation.schema);
            const mode = validation.mode ?? 'query';

            if (mode === 'query') {
              await resolver.validate(req.query);
            } else if (mode === 'body') {
              await resolver.validate(req.body);
            } else if (mode === 'headers') {
              await resolver.validate((req as NextApiRequestWithHeaders).headers);
            }
          })
        );

        if (next) {
          next();
          return;
        }

        if (handler) {
          return handler(req, res);
        }

        res.status(404).end();
      } catch (error) {
        res.status(400).send(error);
      }
    };
}
