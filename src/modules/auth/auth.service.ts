import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { user_name, email, password, confirmPassword } = createAuthDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {throw new BadRequestException('Email already in use');}
    const existingUserName = await this.userRepository.findOne({ where: { user_name } });
    if (existingUserName) {throw new BadRequestException('Username already in use');}
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10));
    createAuthDto.password = hashedPassword;
    const user = this.userRepository.create({
      user_name: createAuthDto.user_name,
      email: createAuthDto.email,
      password: createAuthDto.password,
    });
    const savedUser = await this.userRepository.save(user);
    return {
      user_name: savedUser.user_name,
      email: savedUser.email,
      isEmailVerified: savedUser.isEmailVerified,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }

  async login(user_name: string, password: string) {
    const user = await this.userRepository.findOne({ where: { user_name } });
    if (!user) {
      throw new UnauthorizedException('Invalid Username or Password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Username or Password');
    }
    console.log(`isPasswordValid: ${isPasswordValid}`);
    // Generate a JWT token
    const payload = { sub: user.id, username: user.user_name };
    console.log(`Payload for JWT: ${JSON.stringify(payload)}`);
    const token = await this.jwtService.signAsync(payload);
    console.log(`Generated token: ${token}`);

    let res = {
      user_name: user.user_name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      token: token,
    };
    return res;
  }
}
