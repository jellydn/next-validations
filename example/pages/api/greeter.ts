import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';
import * as valibot from 'valibot';

const schema = valibot.object({
  name: valibot.string([valibot.minLength(4)]),
});

const validate = withValidation({
  schema,
  mode: 'query',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.query);
};

export default validate(handler);
