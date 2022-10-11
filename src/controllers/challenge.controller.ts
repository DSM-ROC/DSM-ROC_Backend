import { ChallengeRepository } from "../repositories/challenge.repository";
import { ChallengeService } from "../services/challenge.service";
import { Challenge } from "../entity/challenge";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { UserRepository } from "../repositories/user.repository";

export class ChallengeController {
    private challengeService: ChallengeService = new ChallengeService(
        ChallengeRepository.getQueryRepository(),
        UserRepository.getQueryRepository(),

    );
}