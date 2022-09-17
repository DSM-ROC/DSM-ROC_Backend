import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';

export interface RefreshCookie {
  [REFRESH_TOKEN_COOKIE_KEY]: string;
}
