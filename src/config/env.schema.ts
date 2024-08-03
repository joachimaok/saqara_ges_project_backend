import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_URI: Joi.string().required(),
});
