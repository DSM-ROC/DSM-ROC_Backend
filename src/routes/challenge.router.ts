import { Router } from 'express';
import { ChallengeController } from '../controllers/challenge.controller';
import { errorHandler } from '../middlewares/errorHandler';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/verifyToken';

const router: Router = Router();
export const challengeServiceRouter = (app: Router) => {
	const challengeController: ChallengeController = new ChallengeController();

	app.use('/challenge', router);

	router.post('/', verifyTokenMiddleware, errorHandler(challengeController.createChallenge));
	router.get('/', errorHandler(challengeController.getAllChallenge));
	router.get('/search', errorHandler(challengeController.searchChallenge));
	router.get('/me', verifyTokenMiddleware, errorHandler(challengeController.getMyChallenge));
	router.post(
		'/:challenge_id',
		verifyTokenMiddleware,
		errorHandler(challengeController.joinChallenge),
	);
	router.get('/:challenge_id', errorHandler(challengeController.getOneChallenge));
	router.get(
		'/:challenge_id/member', 
		verifyTokenMiddleware,
		errorHandler(challengeController.getChallengeMember)
	);
};
