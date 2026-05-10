import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .required(),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('1h'),
  }),
  validationOptions: { allowUnknown: true, abortEarly: false },
};
