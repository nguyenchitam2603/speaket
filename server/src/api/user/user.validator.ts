import * as Joi from 'joi';

export let signInValidator = {
  payload: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
};

export let signOutValidator = {
  payload: {}
};

export let signUpValidator = {
  payload: {
    email: Joi.string().required(),
    password: Joi.string().required(),
    roles: Joi.array().items(Joi.string())
  }
};
