import jwt from 'jsonwebtoken';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import { errorHandler } from './errorHandler';
import { TokenPayload } from '../shared/TokenPayloadInterface';
import { config } from '../config';
import { BadRequestError, ExpiredTokenError, UnAuthorizedError } from '../shared/exception';

const verifyTokenLogic: (type: string, headers: string) => BusinessLogic =
  (type: string, headers: string) => (req, res, next) => {
    try {
      const token: string = req.headers[headers] as string;
      if (!token) {
        return next(new BadRequestError());
      }
      const payload: TokenPayload = jwt.verify(
        token.slice(7),
        config.jwtSecret,
      ) as unknown as TokenPayload;
      if (payload.type !== type) {
        return next(new UnAuthorizedError());
      }
      req.decoded = payload;
      next();
    } catch (err) {
      if (err.message === 'ExpiredError') {
        next(new ExpiredTokenError());
      } else {
        next(new UnAuthorizedError());
      }
    }
  };

const verifyTokenMiddleware: BusinessLogic = errorHandler(
  verifyTokenLogic('access', 'authorization'),
);

const verifyRefreshTokenMiddleware: BusinessLogic = errorHandler(
  verifyTokenLogic('refresh', 'refresh-token'),
);

export { verifyTokenMiddleware, verifyRefreshTokenMiddleware };
