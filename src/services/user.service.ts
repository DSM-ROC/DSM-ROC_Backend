import jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../entity/user';
import { UserRepository } from '../repositories/user.repository';
import {
  UpdateInfo,
  UserInfo,
  UserInfoResObj,
  UserLoginInfo,
  UserTokenResOhj,
} from '../shared/DataTransferObject';
import { BadRequestError, ConflictError, UnAuthorizedError } from '../shared/exception';
import { comparePassword, generateHash } from '../utils/hash';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(
    id: number,
  ): Promise<{ email: string; nickname: string; gender: string } & UpdateInfo> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new UnAuthorizedError();
    }
    const { email, nickname, gender, createdAt, updatedAt } = user;
    return { email, nickname, gender, createdAt, updatedAt };
  }

  async createUser(userInfo: UserInfo): Promise<{ id: number } & UpdateInfo & UserTokenResOhj> {
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

  async login({ email, password }: UserLoginInfo): Promise<UserTokenResOhj> {
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

  public async refreshToken(email: string, refreshToken: string): Promise<UserTokenResOhj> {
    const accessToken: string = await this.issuanceToken(email, 'access');
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  public async showUserInfo(email: string): Promise<UserInfoResObj> {
    const user: User = await this.userRepository.findUserByIdentity(email);

    if (!user) {
      throw new BadRequestError();
    }
    return { ...user };
  }

  private async issuanceToken(email: string, type: string): Promise<string> {
    return jwt.sign(
      {
        sub: `${email}`,
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
