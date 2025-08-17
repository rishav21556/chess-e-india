import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/guard/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
