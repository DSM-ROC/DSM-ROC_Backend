import { ChallengeRepository } from "../repositories/challenge.repository";
import { ChallengeService } from "../services/challenge.service";
import { Challenge } from "../entity/challenge";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { UserRepository } from "../repositories/user.repository";
import { ChallengeInfo } from "../shared/DataTransferObject";

export class ChallengeController {
    private challengeService: ChallengeService = new ChallengeService(
        ChallengeRepository.getQueryRepository()
    );

    public createChallenge: BusinessLogic = async(req, res, next) => {
        const challengeInfo = req.body as ChallengeInfo;
        const user = req.decoded;
    
        const newChallenge = await this.challengeService.createChallenge(challengeInfo, user);

        return res.status(201).json(newChallenge);
    };

    public searchChallenge: BusinessLogic = async(req, res, next) => {
        const searchWord = req.query.where as string;
        
        const Challenge = await this.challengeService.searchChallenge(searchWord);

        return res.status(200).json(Challenge);
    }

}