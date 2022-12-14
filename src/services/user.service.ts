import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserRepository } from '../repositories/user.repository';
import {
	UpdateInfo,
	UserInfo,
	UserInfoResObj,
	UserLoginInfo,
	UserTokenResObj,
	UserUpdateInfo,
} from '../shared/DataTransferObject';
import {
	BadRequestError,
	ConflictError,
	ForbiddenError,
	UnAuthorizedError,
} from '../shared/exception';
import { comparePassword, generateHash } from '../utils/hash';

export class UserService {
	constructor(private userRepository: UserRepository) {}

	async getUser(id: number): Promise<{ email: string; nickname: string } & UpdateInfo> {
		const user = await this.userRepository.findUserById(id);
		if (!user) {
			throw new UnAuthorizedError();
		}
		const { email, nickname, createdAt, updatedAt } = user;
		return { email, nickname, createdAt, updatedAt };
	}

	async createUser(userInfo: UserInfo): Promise<{ id: number } & UpdateInfo & UserTokenResObj> {
		const alreadyRegisteredUser = await this.userRepository.findUserByEmail(userInfo.email);
		if (alreadyRegisteredUser) {
			throw new ConflictError();
		}

		const hashedPassword = generateHash(userInfo.password);

		const userInfoToCreate = { ...userInfo, password: hashedPassword };
		const { id, createdAt, updatedAt } = await this.userRepository.createUser(userInfoToCreate);

		return {
			id,
			createdAt,
			updatedAt,
			access_token: await this.issuanceToken(userInfo.email, 'access'),
			refresh_token: await this.issuanceToken(userInfo.email, 'refresh'),
		};
	}

	async login({ email, password }: UserLoginInfo): Promise<UserTokenResObj> {
		const user = await this.userRepository.findUserByEmail(email);
		if (!user) {
			throw new UnAuthorizedError();
		}

		const isValid = comparePassword(user.password, password);
		if (!isValid) {
			throw new UnAuthorizedError();
		}

		return {
			access_token: await this.issuanceToken(user.email, 'access'),
			refresh_token: await this.issuanceToken(user.email, 'refresh'),
		};
	}

	async updateUserInfo(userUpdateInfo: UserUpdateInfo): Promise<UserUpdateInfo & UpdateInfo> {
		const user = await this.userRepository.findUserById(userUpdateInfo.id);

		console.log(user);
		if (!user) {
			throw new ForbiddenError();
		} else {
			const { id, nickname, createdAt, updatedAt } = await this.userRepository.updateUserInfo(
				userUpdateInfo,
			);
			return {
				id,
				nickname,
				createdAt,
				updatedAt,
			};
		}
	}

	async cancleMember(id: number, password: string): Promise<void> {
		const user = await this.userRepository.findUserById(id);

		if (!user) throw new UnAuthorizedError();
		console.log(password, user, id);
		const isValid = comparePassword(user.password, password);
		if (!isValid) {
			throw new ForbiddenError();
		} else {
			this.userRepository.cancleMember(id);
		}
	}

	public async refreshToken(email: string, refreshToken: string): Promise<UserTokenResObj> {
		const accessToken: string = await this.issuanceToken(email, 'access');
		return {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}

	public async showUserInfo(id: string): Promise<UserInfoResObj> {
		const user = await this.userRepository.findUserByIdentity(id);

		if (!user) {
			throw new BadRequestError();
		}
		return { ...user };
	}

	private async issuanceToken(email: string, type: string): Promise<string> {
		const user = this.userRepository.findUserByEmail(email);
		return jwt.sign(
			{
				sub: `${email}`,
				id: (await user).id,
				type,
			},
			config.jwtSecret,
			{
				algorithm: 'HS256',
				expiresIn: type === 'access' ? '2h' : '14d',
			},
		);
	}
}
