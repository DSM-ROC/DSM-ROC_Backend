import { Router } from 'express';
import { userServiceRouter } from './user.router';
import { challengeServiceRouter } from './challenge.router';
import { reviewServiceRouter } from './review.router';

export const dsmlocRouter = () => {
	const app = Router();

	userServiceRouter(app);
	reviewServiceRouter(app);
	challengeServiceRouter(app);

	return app;
};
