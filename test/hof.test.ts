import * as yup from "yup";
import { withValidation, withValidations } from "../src";

const schema = yup.object().shape({
  name: yup.string().required(),
});

describe("withValidation", () => {
  it("should return function", () => {
    expect(withValidation({
      schema,
      type: "Yup",
      mode: "query",
    })).toMatchSnapshot();
  });
});

it("should handle App Router validation errors", () => {
  const validation = {
    schema,
    type: "Yup",
    mode: "query",
    apiType: "appRoute",
  };
  const handler = jest.fn();
  const res = {
    status: jest.fn().mockReturnThis(),
    end: jest.fn(),
  };
  withValidation(validation)(null, res, handler);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.end).toHaveBeenCalled();
});

it("should handle traditional API route validation errors", () => {
  const validation = {
    schema,
    type: "Yup",
    mode: "query",
    apiType: "pageRoute",
  };
  const handler = jest.fn();
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  const error = new Error("Validation error");
  withValidation(validation)(error, null, res, handler);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith(error.message);
});

describe("withValidations", () => {
  it("should return function", () => {
    expect(withValidations([{
      schema,
      type: "Yup",
      mode: "body",
    }])).toMatchSnapshot();
  });
});

it("should handle App Router validation errors in withValidations", () => {
  const validations = [{
    schema,
    type: "Yup",
    mode: "query",
    apiType: "appRoute",
  }];
  const handler = jest.fn();
  const res = {
    status: jest.fn().mockReturnThis(),
    end: jest.fn(),
  };
  withValidations(validations)(null, res, handler);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.end).toHaveBeenCalled();
});

it("should handle traditional API route validation errors in withValidations", () => {
  const validations = [{
    schema,
    type: "Yup",
    mode: "query",
    apiType: "pageRoute",
  }];
  const handler = jest.fn();
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  const error = new Error("Validation error");
  withValidations(validations)(error, null, res, handler);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith(error.message);
});