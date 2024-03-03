import * as yup from 'yup';
import { withValidation, withValidations } from '../src';

const schema = yup.object().shape({
  name: yup.string().required(),
});

describe('withValidation', () => {
  it('should return function', () => {
    expect(withValidation({ schema, mode: 'query' })).toMatchSnapshot();
  });
});

describe('withValidations', () => {
  it('should return function', () => {
    expect(withValidations([{ schema, mode: 'body' }])).toMatchSnapshot();
  });
});
