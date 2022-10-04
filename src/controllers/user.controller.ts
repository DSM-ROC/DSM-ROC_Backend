import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import {
  UserInfo,
  UserInfoResObj,
  UserLoginInfo,
  UserTokenResOhj,
} from '../shared/DataTransferObject';

export class UserController {
  private userService: UserService = new UserService(UserRepository.getQueryRepository());

  public createUser: BusinessLogic = async (req, res, next) => {
    const userInfoToCreate = req.body as UserInfo;

    const response: UserTokenResOhj = await this.userService.createUser(userInfoToCreate);
    res.status(201).json(response);
  };

  public login: BusinessLogic = async (req, res, next) => {
    const userInfoToLogin = req.body as UserLoginInfo;

    const response: UserTokenResOhj = await this.userService.login(userInfoToLogin);
    res.status(200).json(response);
  };

  public refreshToken: BusinessLogic = async (req, res, next) => {
    const refreshToken: string = req.headers.authorization['refresh-token'] as string;
    const response: UserTokenResOhj = await this.userService.refreshToken(
      req.decoded.sub,
      refreshToken.slice(7),
    );
    res.status(200).json(response);
  };

  public showUserInfo: BusinessLogic = async (req, res, next) => {
    const response: UserInfoResObj = await this.userService.showUserInfo(req.params.email);
    res.status(200).json(response);
  };
}
