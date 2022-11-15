import { Router } from "express";
import { ChallengeController } from "../controllers/challenge.controller";
import { errorHandler } from "../middlewares/errorHandler";
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from "../middlewares/verifyToken";

const router: Router = Router();
export const challengeServiceRouter = (app: Router) => {
    const challengeController: ChallengeController = new ChallengeController();

    app.use('/challenge', router);

    router.post('/', verifyTokenMiddleware, errorHandler(challengeController.createChallenge));
}