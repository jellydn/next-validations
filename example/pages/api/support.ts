import { NextApiRequest, NextApiResponse } from "next";

import * as yup from "yup";
import Joi from "joi";
import connect from "next-connect";
import { withValidations } from "next-validations";


const querySchema = yup.object().shape({
  type: yup.string().oneOf(['email','sms']).required(),
});

const validateQuery = {
  schema: querySchema,
  type: "Yup",
  mode: "query",
} as const;

const bodySchema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  name: Joi.string().required(),
});

const validateBody = {
  schema: bodySchema,
  type: "Joi",
  mode: "body",
} as const;

const validate = withValidations([validateQuery, validateBody]);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({...req.body, ...req.query});
};

export default connect().post(validate(), handler);
