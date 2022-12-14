import { Router } from 'express';
import { ChallengeController } from '../controllers/challenge.controller';
import { errorHandler } from '../middlewares/errorHandler';
import { verifyTokenMiddleware } from '../middlewares/verifyToken';
import { upload } from '../repositories/upload.repository';

const router: Router = Router();
export const challengeServiceRouter = (app: Router) => {
	const challengeController: ChallengeController = new ChallengeController();

	app.use('/challenge', router);

	router.get('/', errorHandler(challengeController.getAllChallenge));
	router.get('/search', errorHandler(challengeController.searchChallenge));
	router.get('/me', verifyTokenMiddleware, errorHandler(challengeController.getMyChallenge));
	router.get('/:challenge_id', errorHandler(challengeController.getOneChallenge));
	router.get(
		'/:challenge_id/member',
		verifyTokenMiddleware,
		errorHandler(challengeController.getChallengeMember),
	);
	router.post(
		'/',
		verifyTokenMiddleware,
		upload.single('image'),
		errorHandler(challengeController.createChallenge),
	);
	router.post(
		'/:challenge_id',
		verifyTokenMiddleware,
		errorHandler(challengeController.joinChallenge),
	);
	router.delete(
		'/:challenge_id',
		verifyTokenMiddleware,
		errorHandler(challengeController.exitChallenge),
	);
};
