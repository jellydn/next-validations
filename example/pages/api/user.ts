import { NextApiRequest, NextApiResponse } from 'next';

import { z } from 'zod';
import { withValidation } from 'next-validations';

const schema = z.object({
  username: z.string().min(6),
});

const validate = withValidation({
  schema,
  type: 'Zod',
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default validate(handler);
