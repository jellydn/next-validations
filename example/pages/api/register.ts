import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';

const schema = {
  name: { type: 'string', min: 3, max: 255 },
  email: { type: 'email' },
  age: 'number',
};

const validate = withValidation({
  schema,
  type: 'FastestValidator',
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default validate(handler);
