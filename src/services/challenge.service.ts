import { Challenge } from "../entity/challenge";
import { ChallengeRepository } from "../repositories/challenge.repository";
import { User } from "../entity/user";

export class ChallengeService {
    constructor(private challengeRepository: ChallengeRepository) {}
}