import type { Schema } from '@typeschema/main';
import type { NextApiRequest, NextApiResponse } from 'next';
import { typeschemaResolver } from './resolver';

type NextHandler = (err?: Error) => void;

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
            await resolver.validate(req[validation.mode ?? 'query']);
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
