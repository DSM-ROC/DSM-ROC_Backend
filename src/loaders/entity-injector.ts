import { ObjectLiteral } from 'typeorm';

import { User } from '../entity/user';
import dependencyInjector, { DependencyInfo } from './dependency-injector';

const entityInjector = (): void => {
  const entities: DependencyInfo<ObjectLiteral>[] = [{ name: 'user', dependency: new User() }];

  dependencyInjector<ObjectLiteral>(entities);
};

export default entityInjector;
