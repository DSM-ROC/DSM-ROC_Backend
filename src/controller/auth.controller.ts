import { CookieOptions, NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';
import JwtHelper from '../helpers/jwt';
import AuthService from '../services/auth.service';
import { LoginRequestBody } from '../types';
import { getRefreshToken } from '../utils/jwt';

export const UserLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userLoginInfo = req.body as LoginRequestBody;

    const authServiceInstance = Container.get(AuthService);
    const jwtHelper = Container.get<JwtHelper>('jwtHelper');

    const { access, refresh } = await authServiceInstance.login(userLoginInfo);

    const refreshTokenExpires = new Date(Date.now() + jwtHelper.getRefreshExpiresInMs());
    const refreshTokenCookieOptions: CookieOptions = {
      expires: refreshTokenExpires,
      secure: false,
      httpOnly: true,
    };
    res.cookie(REFRESH_TOKEN_COOKIE_KEY, refresh, refreshTokenCookieOptions);

    res.status(200).json({ access });
  } catch (e) {
    next(e);
  }
};

export const UserLogout = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export const UserRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { redirect } = req.query;

    const authServiceInstance = Container.get(AuthService);

    const refreshToken = getRefreshToken(req.cookies);
    const { access } = await authServiceInstance.refreshAccessToken(refreshToken);

    if (redirect) {
      res.status(200).json({ requestAgain: true, access });
    } else {
      res.status(200).json({ access });
    }
  } catch (e) {
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
    next(e);
  }
};
