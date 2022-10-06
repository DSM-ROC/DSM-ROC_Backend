import Joi from 'joi';
import { Gender } from '../entity/user';

export class UserLoginInfo {
  email: string;

  password: string;
}

export class UpdateInfo {
  createdAt: Date;

  updatedAt: Date;
}

export class UserInfo {
  email: string;

  password: string;

  nickname: string;

  gender: Gender;
}

export class UserUpdateInfo {
  id: number;

  nickname: string;

  gender: Gender;
}

export class UserInfoResObj {
  id: number;

  email: string;

  nickname: string;

  gender: Gender;

  createdAt: Date;

  updatedAt: Date;
}

export class UserTokenResObj {
  access_token: string;

  refresh_token: string;
}

export class ProvideUserTokenDto {
  code: string;
}

export const ProvideUserTokenSchema: Joi.ObjectSchema<ProvideUserTokenDto> = Joi.object().keys({
  code: Joi.string().required(),
});
