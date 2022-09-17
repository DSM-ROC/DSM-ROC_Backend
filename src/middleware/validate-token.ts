import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import { commonError } from '../constants/error';
import JwtHelper from '../helpers/jwt';
import { ErrorResponse } from '../utils/error-response';
import { getAccessToken, getRefreshToken } from '../utils/jwt';

const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = getAccessToken(req.headers.authorization);
    const refreshToken = getRefreshToken(req.cookies);

    if (!accessToken || !refreshToken) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const jwtHelper = Container.get<JwtHelper>('jwtHelper');
    const isTokenExpired = await jwtHelper.checkTokenExpiration(accessToken);

    if (isTokenExpired) {
      res.redirect(303, '/api/auth?redirect=true');
      return;
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateToken;
