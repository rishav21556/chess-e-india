import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('requests')
  async GetAllFriendRequest(){
    return await this.friendsService.GetAllFriendRequest();
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async GetAllFriends(){
    return await this.friendsService.GetAllFriends();
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-request/:req_friend_user')
  async SendFriendRequest(@Param('req_friend_user') req_friend_user: string, @Req() req){
    const userId = req.user.id;
    return await this.friendsService.SendFriendRequest(userId, req_friend_user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('accept-request/:requestId')
  async AcceptFriendRequest(@Param('requestId') requestId: string, @Req() req){
    const userId = req.user.id;
    return await this.friendsService.AcceptFriendRequest(userId, requestId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reject-request/:requestId')
  async RejectFriendRequest(@Param('requestId') requestId: string, @Req() req){
    const userId = req.user.id;
    return await this.friendsService.RejectFriendRequest(userId, requestId);
  }

}
