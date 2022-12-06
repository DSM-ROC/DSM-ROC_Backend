import { Router } from 'express';
import { userServiceRouter } from './user.router';
import { challengeServiceRouter } from './challenge.router';

export const dsmlocRouter = () => {
	const app = Router();

	userServiceRouter(app);
	challengeServiceRouter(app);

	return app;
};
