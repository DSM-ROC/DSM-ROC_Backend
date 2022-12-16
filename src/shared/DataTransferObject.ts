import Joi from 'joi';
import { Topic } from '../entity/enum/topic.enum';

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
}

export class UserUpdateInfo {
	id: number;
	nickname: string;
}

export class UserInfoResObj {
	id: number;
	email: string;
	nickname: string;
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

export class ChallengeInfo {
	name: string;
	introduction: string;
	limitMember: number;
	password: number;
	startDay: Date;
	endDay: Date;
	topic: Topic;
}

export const ProvideUserTokenSchema: Joi.ObjectSchema<ProvideUserTokenDto> = Joi.object().keys({
	code: Joi.string().required(),
});
