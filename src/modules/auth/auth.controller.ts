import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/auth.config';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post('login')
  async login(@Body() loginDto: { user_name: string; password: string }, @Res({ passthrough: true }) res) {
    const result = await this.authService.login(loginDto.user_name, loginDto.password);
    if (result && result.token) {
      // Set cookie with proper configuration
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: parseInt(String(jwtConfig.signOptions?.expiresIn) || '1') * 60 * 60 * 1000
      });
    }
    return result;
  }

  @Post('/verify')
  @UseGuards(JwtAuthGuard)
  async verify(@Req() req) {
    return req.user;
  }
}
