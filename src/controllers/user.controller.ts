import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import {
	UserInfo,
	UserInfoResObj,
	UserLoginInfo,
	UserTokenResObj,
	UserUpdateInfo,
} from '../shared/DataTransferObject';

export class UserController {
	private userService: UserService = new UserService(UserRepository.getQueryRepository());

	public createUser: BusinessLogic = async (req, res, next) => {
		const userInfoToCreate = req.body as UserInfo;

		const response: UserTokenResObj = await this.userService.createUser(userInfoToCreate);
		return res.status(201).json(response);
	};

	public login: BusinessLogic = async (req, res, next) => {
		const userInfoToLogin = req.body as UserLoginInfo;

		const response: UserTokenResObj = await this.userService.login(userInfoToLogin);
		return res.status(200).json(response);
	};

	public updateInfo: BusinessLogic = async (req, res, next) => {
		const { nickname } = req.body;
		const { id } = req.decoded;

		const response: UserUpdateInfo = await this.userService.updateUserInfo({ nickname, id });
		return res.status(200).json(response);
	};

	public cancelMember: BusinessLogic = async (req, res, next) => {
		await this.userService.cancleMember(req.decoded.id, req.body.password);

		return res.status(200).send({
			message: '회원 탈퇴되었습니다.',
		});
	};

	public refreshToken: BusinessLogic = async (req, res, next) => {
		const refreshToken: string = req.headers.authorization['refresh-token'] as string;
		const response: UserTokenResObj = await this.userService.refreshToken(
			req.decoded.sub,
			refreshToken.slice(7),
		);
		return res.status(200).json(response);
	};

	public showUserInfo: BusinessLogic = async (req, res, next) => {
		const response: UserInfoResObj = await this.userService.showUserInfo(req.params.id);
		return res.status(200).json(response);
	};
}
