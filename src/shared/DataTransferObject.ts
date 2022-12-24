import Joi from 'joi';
import { Challenge } from '../entity/challenge';
import { Topic } from '../entity/enum/topic.enum';
import { Post } from '../entity/post';

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

export class ShowUserInfoResObj {
	id: number;
	email: string;
	nickname: string;
}

export class UserTokenResObj {
	access_token: string;
	refresh_token: string;
}

export class ProvideUserTokenDto {
	code: string;
}

export class ChallengeInfo extends Challenge {
	name: string;
	introduction: string;
	limitMember: number;
	startDay: Date;
	endDay: Date;
	topic: Topic;
}

export class PostInfo extends Post {
	title: string;
	text: string;
}

export const ProvideUserTokenSchema: Joi.ObjectSchema<ProvideUserTokenDto> = Joi.object().keys({
	code: Joi.string().required(),
});
