import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
import iconv from 'iconv-lite';
import { logger } from './shared/logger';
import { initApplication } from './loaders';

iconv.encodingExists('foo');

dotenv.config({ path: path.join(__dirname, '../.env') });

initApplication().catch(() => console.error('server start failed'));

process.on('uncaughtException', (err: Error) => {
  console.error(err);
  logger.error('uncaughtException');
  logger.error(err);
});
