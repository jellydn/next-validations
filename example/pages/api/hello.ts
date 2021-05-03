import { withValidation } from 'next-validations';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const validate = withValidation({
  schema,
  type: 'Yup',
  mode: 'query',
});

const handler = (req, res) => {
  res.status(200).json(req.query);
};

export default validate(handler);
