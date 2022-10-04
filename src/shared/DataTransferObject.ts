import Joi from 'joi';

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

  gender: string;
}

export class UserInfoResObj {
  id: number;

  email: string;

  nickname: string;

  gender: string;

  createdAt: Date;

  updatedAt: Date;
}

export class UserTokenResOhj {
  access_token: string;

  refresh_token: string;
}

export class ProvideUserTokenDto {
  code: string;
}

export const ProvideUserTokenSchema: Joi.ObjectSchema<ProvideUserTokenDto> = Joi.object().keys({
  code: Joi.string().required(),
});
