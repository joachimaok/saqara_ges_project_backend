import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
  MONGO_INITDB_DATABASE: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
});
