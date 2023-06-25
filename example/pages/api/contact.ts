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
  onError: (err, _req, _event) => {
    return new NextResponse('Something broke!', {
      status: (err as any)?.statusCode ?? 500,
    });
  },
});
