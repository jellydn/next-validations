import Joi from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { withValidations } from 'next-validations';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

const querySchema = yup.object().shape({
  type: yup.string().oneOf(['email', 'sms']).required(),
});

const validateQuery = {
  schema: querySchema,
  type: 'Yup',
  mode: 'query',
} as const;

const bodySchema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

const validateBody = {
  schema: bodySchema,
  type: 'Joi',
  mode: 'body',
} as const;

const validate = withValidations([validateQuery, validateBody]);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ ...req.body, ...req.query });
};

const router = createRouter();

router.post(validate(), handler);

export default router.handler({
  // @ts-expect-error  │     Type '(err: unknown) => NextResponse<unknown>' is not assignable to type '(err: unknown, req: IncomingMessage, res: ServerResponse) => ValueOrPromise<void>'.  Type 'NextR typescript (2322) [41, 3]
  onError: (err) => {
    return new NextResponse('Something broke!', {
      status: (err as any)?.statusCode ?? 500,
    });
  },
});
