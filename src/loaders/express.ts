import fs from 'fs';
import express, { NextFunction, Request, Response, Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ServerResponse } from 'http';
import { config } from '../config';
import { dsmlocRouter } from '../routes';
import { HttpError, NotFoundError } from '../shared/exception';
import { logger } from '../shared/logger';

export const loadExpress = (app: Application) => {
	app.set('port', config.ServicePort || '3000');

	app.use((req: Request, res: Response, next: NextFunction) => {
		morgan('combined', {
			stream: fs.createWriteStream('./logs/log.log', { encoding: 'utf-8' }),
		})(req, res as ServerResponse, next);
	});

	app.use((req: Request, res: Response, next: NextFunction) => {
		express.json()(req, res as ServerResponse, next);
	});

	app.use((req: Request, res: Response, next: NextFunction) => {
		express.urlencoded({ extended: false })(req, res as ServerResponse, next);
	});

	app.use(cors());

	app.use('/', dsmlocRouter());

	app.use((req: Request, res: Response, next: NextFunction) => {
		next(new NotFoundError(req.url));
	});

	app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
		logger.info(err.message);
		const statusCode: number = err.statusCode || 500;
		res.status(statusCode).json({
			statusCode,
			message: err.message,
			timeStamp: new Date(),
		});
	});

	app.listen(app.get('port'), () => {
		console.log('server on', app.get('port'));
	});
};
