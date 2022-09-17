import { Algorithm } from 'jsonwebtoken';

import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';
import { RefreshCookie } from '../types';

export const getJwtAlgorithm = (algorithm: string): Algorithm => {
  const jwtAlgorithms: Algorithm[] = [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'PS256',
    'PS384',
    'PS512',
    'none',
  ];
  const jwtAlgorithm = jwtAlgorithms.find(jwtAlgo => jwtAlgo === algorithm) || 'none';
  return jwtAlgorithm;
};

export const getAccessToken = (authorization: string | undefined): string => {
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1];
  }
  return '';
};

export const getRefreshToken = (cookies: RefreshCookie): string => {
  if (!cookies[REFRESH_TOKEN_COOKIE_KEY]) return '';
  return cookies[REFRESH_TOKEN_COOKIE_KEY];
};
