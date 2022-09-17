import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user';
import { UserInfo } from '../types';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findById(id: number): Promise<User | undefined> {
    const user = await this.findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });
    return user;
  }

  async createUser(userInfo: UserInfo): Promise<User> {
    const newUser = this.create(userInfo);
    const createdUser = await this.save(newUser);
    return createdUser;
  }
}

export default UserRepository;
