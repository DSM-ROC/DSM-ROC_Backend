import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import { User } from '../entity/user';
import { UserInfo, UserUpdateInfo } from '../shared/DataTransferObject';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  static getQueryRepository() {
    return getCustomRepository(UserRepository);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.findOne({ id });
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({ email });
    return user;
  }

  async createUser(userInfo: UserInfo): Promise<User> {
    const newUser = this.create(userInfo);
    const createUser = await this.save(newUser);
    return createUser;
  }

  async findUserByIdentity(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async updateUserInfo(userUpdateInfo: UserUpdateInfo): Promise<User> {
    const user = await this.findOne(userUpdateInfo.id);

    this.merge(user, userUpdateInfo);
    await this.save(user);

    const newInfo = await this.findOne(userUpdateInfo.id);

    return newInfo;
  }
}
