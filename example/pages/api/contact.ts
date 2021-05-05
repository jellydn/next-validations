import { NextApiRequest, NextApiResponse } from 'next';

import Joi from 'joi';
import connect from 'next-connect';
import { withValidation } from 'next-validations';

const schema = Joi.object({
  dob: Joi.date().iso(),
  email: Joi.string()
    .email()
    .required(),
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

export default connect().post(validate(), handler);
