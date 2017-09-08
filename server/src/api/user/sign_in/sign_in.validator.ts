import * as Joi from 'joi';

export let signInValidator = {
  payload: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
};
