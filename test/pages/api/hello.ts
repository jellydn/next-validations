import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { withValidation } from '../../../src/withValidation';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const validate = withValidation({
  schema,
  type: 'Yup',
  mode: 'query',
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(req.query);
};

export default validate(handler);
