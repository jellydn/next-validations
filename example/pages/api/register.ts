import type { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';

// This is fastest-validator schema
const schema = {
  name: { type: 'string', min: 3, max: 255 },
  email: { type: 'email' },
  age: 'number',
};

const validate = withValidation({
  // This is fastest-validator schema, the type is not working nicely with TypeScript
  schema: schema as any,
  mode: 'body',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.body);
};

export default validate(handler);
