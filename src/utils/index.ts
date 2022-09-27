import 'reflect-metadata';

import { Application } from 'express';

import expressLoader from './express';
import { connect } from './connect';

export default async (app: Application): Promise<void> => {
  await connect();
  console.info('Database connected');

  expressLoader(app);
  console.info('Express loaded');
};
