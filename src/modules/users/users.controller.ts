import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getDashboardData(@Req() req, @Query('user_id') userId?: string): Promise<any> {
    const data = await this.usersService.getDashboardData(userId ? userId : req.user.id);
    return data;
  }
  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchUserName(@Query('partial_user_name') partialUserName?: string): Promise<any> {
    const data = await this.usersService.searchUserName(partialUserName);
    return data;
  }
}
