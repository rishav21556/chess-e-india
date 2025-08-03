import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/users.entity' // Make sure User entity is imported
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/auth.config';

@Module({
  imports: [JwtModule.register(jwtConfig), TypeOrmModule.forFeature([User])], // Assuming User entity is defined
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
