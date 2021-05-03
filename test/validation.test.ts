import * as yup from 'yup';
import { createResolver } from '../src/validation';

describe('Yup Validation', () => {
  it('should create yup resolve base on schema', () => {
    const resolver = createResolver('Yup', {});
    expect(resolver).toMatchSnapshot();
  });

  it('should return true', () => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      age: yup
        .number()
        .required()
        .positive()
        .integer(),
      email: yup.string().email(),
      website: yup.string().url(),
      createdOn: yup.date().default(function() {
        return new Date();
      }),
    });
    const resolver = createResolver('Yup', schema);
    const isValid = resolver.validate({
      name: 'jimmy',
      age: 24,
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', () => {
    let schema = yup.object().shape({
      name: yup.string().required(),
      age: yup
        .number()
        .required()
        .positive()
        .integer(),
      email: yup.string().email(),
      website: yup.string().url(),
      createdOn: yup.date().default(function() {
        return new Date();
      }),
    });
    const resolver = createResolver('Yup', schema);
    try {
      resolver.validate({
        name: 'jimmy',
      });
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});

describe('Yoi Validation', () => {
  it('should create yoi resolve base on schema', () => {
    try {
      createResolver('Joi', {});
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});
