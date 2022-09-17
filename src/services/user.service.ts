import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../repositories/user.repository';
import { ErrorResponse } from '../utils/error-response';
import { commonError } from '../constants/error';
import { generateHash } from '../utils/hash';
import { UpdateInfo, UserInfo } from '../types';

@Service()
class UserService {
  private userRepository: UserRepository;

  constructor(@InjectRepository(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(
    id: number,
  ): Promise<{ email: string; nickname: string; gender: string } & UpdateInfo> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }
    const { email, nickname, gender, createdAt, updatedAt } = user;
    return { email, nickname, gender, createdAt, updatedAt };
  }

  async createUser(userInfo: UserInfo): Promise<{ id: number } & UpdateInfo> {
    const alreadyRegisteredUser = await this.userRepository.findByEmail(userInfo.email);
    if (alreadyRegisteredUser) {
      throw new ErrorResponse(commonError.conflict);
    }

    const hashedPassword = generateHash(userInfo.password);

    const userInfoToCreate = { ...userInfo, password: hashedPassword };
    const { id, createdAt, updatedAt } = await this.userRepository.createUser(userInfoToCreate);

    return { id, createdAt, updatedAt };
  }
}

export default UserService;
