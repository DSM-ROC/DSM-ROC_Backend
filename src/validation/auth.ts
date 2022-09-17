import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';
import { commonError } from '../constants/error';
import { ErrorResponse } from '../utils/error-response';

export const loginValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().required().empty('').messages({
      'any.required': `이메일를 입력해주세요`,
    }),
    password: Joi.string().required().empty('').messages({
      'any.required': `비밀번호를 입력해주세요`,
    }),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorResponse({
      statusCode: 400,
      message: validationResult.error.message,
    });
  }

  next();
};

export const refreshValidation = (req: Request, _res: Response, next: NextFunction): void => {
  const refreshRequestCookies = req.cookies as { [REFRESH_TOKEN_COOKIE_KEY]: string };
  const refreshToken = refreshRequestCookies[REFRESH_TOKEN_COOKIE_KEY];

  if (!refreshToken) {
    throw new ErrorResponse(commonError.unauthorized);
  }

  next();
};
