import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { commonError } from '../constants/error';
import { comparePassword } from '../utils/hash';
import JwtHelper from '../helpers/jwt';
import UserRepository from '../repositories/user.repository';
import { ErrorResponse } from '../utils/error-response';
import { UserLoginInfo } from '../types';

@Service()
class AuthService {
  private userRepository: UserRepository;

  private jwtHelper: JwtHelper;

  constructor(
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @Inject('jwtHelper') jwtHelper: JwtHelper,
  ) {
    this.userRepository = userRepository;
    this.jwtHelper = jwtHelper;
  }

  async login({ email, password }: UserLoginInfo): Promise<{ access: string; refresh: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const isValid = comparePassword(user.password, password);
    if (!isValid) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const tokens = this.jwtHelper.generateJwtTokens(user);
    return tokens;
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access: string }> {
    if (!refreshToken) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const { id } = this.jwtHelper.decodeRefreshToken(refreshToken);

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const access = this.jwtHelper.generateAccessToken(user);
    return { access };
  }
}

export default AuthService;
