import * as Joi from 'joi';

export let signUpValidator = {
  payload: {
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
  }
};
