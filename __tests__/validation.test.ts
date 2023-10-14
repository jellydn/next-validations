import Joi from 'joi';
import * as valibot from 'valibot';
import * as yup from 'yup';
import { z } from 'zod';

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

describe('Zod Validation', () => {
  it('should create zod resolve base on schema', () => {
    try {
      createResolver('Zod', {});
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });

  it('should return true', () => {
    const schema = z.object({
      username: z.string(),
    });

    const resolver = createResolver('Zod', schema);
    const isValid = resolver.validate({
      username: 'jellydn',
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', () => {
    const schema = z.object({
      username: z.string().min(8),
    });
    const resolver = createResolver('Zod', schema);
    try {
      resolver.validate({
        username: 'jellydn',
      });
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});

describe('Valibot Validation', () => {
  it('should create zod resolve base on schema', () => {
    try {
      createResolver('Valibot', {});
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });

  it('should return true', () => {
    const schema = valibot.object({
      username: valibot.string(),
    });

    const resolver = createResolver('Valibot', schema);
    const isValid = resolver.validate({
      username: 'jellydn',
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', () => {
    const schema = valibot.object({
      age: valibot.number()
    });
    const resolver = createResolver('Valibot', schema);
    try {
      resolver.validate({
        age: '35',
      });
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});

