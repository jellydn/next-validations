import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { withValidation } from 'next-validations';
import { NextResponse } from 'next/server';

const schema = Joi.object({
  dob: Joi.date().iso(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

const validate = withValidation({
  schema,
  type: 'Joi',
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
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
