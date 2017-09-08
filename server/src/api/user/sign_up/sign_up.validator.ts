import * as Joi from 'joi';

export let signUpValidator = {
  payload: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    roles: Joi.array().items(Joi.string())
  }
};
