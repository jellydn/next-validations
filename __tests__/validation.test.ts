import Joi from 'joi';
import * as valibot from 'valibot';
import * as yup from 'yup';
import { z } from 'zod';
import { typeschemaResolver } from '../src/resolver';

describe('Yup Validation', () => {
  it('should return true', async () => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required().positive().integer(),
      email: yup.string().email(),
      website: yup.string().url(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });
    const resolver = typeschemaResolver(schema);
    const isValid = await resolver.validate({
      name: 'jimmy',
      age: 24,
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', async () => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required().positive().integer(),
      email: yup.string().email(),
      website: yup.string().url(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });
    const resolver = typeschemaResolver(schema);
    try {
      await resolver.validate({
        name: 'jimmy',
      });
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});

describe('Yoi Validation', () => {
  it('should return true', async () => {
    const schema = Joi.object({
      dob: Joi.date().iso(),
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    });

    const resolver = typeschemaResolver(schema);
    const isValid = await resolver.validate({
      name: 'Huynh Duc Dung',
      email: 'dung@productsway.com',
      dob: 1988,
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', async () => {
    const schema = Joi.object({
      dob: Joi.date().iso(),
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    });
    const resolver = typeschemaResolver(schema);
    try {
      await resolver.validate({});
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});

describe('Zod Validation', () => {
  it('should return true', async () => {
    const schema = z.object({
      username: z.string(),
    });

    const resolver = typeschemaResolver(schema);
    const isValid = await resolver.validate({
      username: 'jellydn',
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', async () => {
    const schema = z.object({
      username: z.string().min(8),
    });
    const resolver = typeschemaResolver(schema);
    try {
      await resolver.validate({
        username: 'jellydn',
      });
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});

describe('Valibot Validation', () => {
  it('should return true', async () => {
    const schema = valibot.object({
      username: valibot.string(),
    });

    const resolver = typeschemaResolver(schema);
    const isValid = await resolver.validate({
      username: 'jellydn',
    });
    expect(isValid).toBeTruthy();
  });

  it('should return false', async () => {
    const schema = valibot.object({
      age: valibot.number(),
    });
    const resolver = typeschemaResolver(schema);
    try {
      await resolver.validate({
        age: '35',
      });
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  });
});
