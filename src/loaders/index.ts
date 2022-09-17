import 'reflect-metadata';

import { Application } from 'express';

import connect from './connect';
import entityInjector from './entity-injector';
import expressLoader from './express';
import helperInjector from './helper-injector';

export default async (app: Application): Promise<void> => {
  await connect();
  console.info('Database connected');

  entityInjector();
  console.info('entities injected');

  helperInjector();
  console.info('helpers injected');

  expressLoader(app);
  console.info('Express loaded');
};
