import { ObjectLiteral } from 'typeorm';

import config from '../config';
import JwtHelper, { JwtOptions } from '../helpers/jwt';
import { getJwtAlgorithm } from '../utils/jwt';
import dependencyInjector, { DependencyInfo } from './dependency-injector';

const helperInjector = (): void => {
  const { algorithm, secret, expire } = config.jwt;
  const jwtOptions: JwtOptions = {
    algorithm: getJwtAlgorithm(algorithm),
    secret,
    accessExpiresInHour: expire.access,
    refreshExpiresInHour: expire.refresh,
  };

  const helpers: DependencyInfo<ObjectLiteral>[] = [
    { name: 'jwtHelper', dependency: new JwtHelper(jwtOptions) },
  ];

  dependencyInjector<ObjectLiteral>(helpers);
};

export default helperInjector;
