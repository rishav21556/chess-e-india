import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';
config();
export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET ,
  signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' },
};
