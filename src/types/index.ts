import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';

export interface RefreshCookie {
  [REFRESH_TOKEN_COOKIE_KEY]: string;
}

export interface UpdateInfo {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLoginInfo {
  email: string;
  password: string;
}

export interface UserInfo {
  email: string;
  password: string;
  nickname: string;
  gender: string;
}

export type LoginRequestBody = UserLoginInfo;

export type CreateUserRequestBody = UserInfo;
