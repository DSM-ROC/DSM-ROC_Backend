import { ConnectionOptions } from 'typeorm';
import { config } from './config';
import { User } from './entity/user';
import { Challenge } from './entity/challenge';
import { Join } from './entity/join';
import { Post } from './entity/post';
import { Comment } from './entity/comment';

export const createOptions: ConnectionOptions = {
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: config.dbSynchronize,
  logging: config.dbLogging,
  entities: [User, Challenge, Join, Post, Comment],
};
