import { Router } from 'express';
import { userServiceRouter } from './user.router';
import { challengeServiceRouter } from './challenge.router';
import { reviewServiceRouter } from './review.router';
import { postServiceRouter } from './post.router';
import { commentServiceRouter } from './comment.router';

export const dsmlocRouter = () => {
	const app = Router();

	userServiceRouter(app);
	reviewServiceRouter(app);
	postServiceRouter(app);
	commentServiceRouter(app);
	challengeServiceRouter(app);

	return app;
};
