import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';

import errorHandler from '../middleware/error';
import config from '../config';
import { commonError } from '../constants/error';
import { ErrorResponse } from '../utils/error-response';

export default (app: Application): void => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(config.corsOptions));

  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  app.all('*', (_req, _res, next) => {
    next(new ErrorResponse(commonError.notFound));
  });
  app.use(errorHandler);
};
