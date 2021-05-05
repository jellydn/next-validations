import * as yup from 'yup';
import Joi from 'joi';

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
    try {
      resolver.validate({
        name: 'jimmy',
      });
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});

describe('FastestValidator Validation', () => {
  it('should create resolve base on schema', () => {
    const resolver = createResolver('FastestValidator', {});
    expect(resolver).toMatchSnapshot();
  });

  it('should return true', () => {
    const schema = {
      id: { type: 'number', positive: true, integer: true },
      name: { type: 'string', min: 3, max: 255 },
      status: 'boolean', // short-hand def
    };
    const resolver = createResolver('FastestValidator', schema);
    const isValid = resolver.validate({
      id: 5,
      name: 'John',
      status: true,
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', () => {
    const schema = {
      id: { type: 'number', positive: true, integer: true },
      name: { type: 'string', min: 3, max: 255 },
      status: 'boolean', // short-hand def
    };
    const resolver = createResolver('FastestValidator', schema);
    try {
      resolver.validate({
        id: 2,
        name: 'Adam',
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

  it('should return true', () => {
    const schema = Joi.object({
      dob: Joi.date().iso(),
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string().required(),
    });

    const resolver = createResolver('Joi', schema);
    const isValid = resolver.validate({
      name: 'Huynh Duc Dung',
      email: 'dung@productsway.com',
      dob: 1988,
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', () => {
    const schema = Joi.object({
      dob: Joi.date().iso(),
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string().required(),
    });
    const resolver = createResolver('Joi', schema);
    try {
      resolver.validate({});
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});
