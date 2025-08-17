import { Injectable, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { JwtAuthGuard } from './modules/auth/guard/auth.guard';
import { FriendRequest } from './entities/friend-request.entity';
import { FriendList } from './entities/friend-list.entity';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(FriendList)
    private friendListRepository: Repository<FriendList>,
  ){}
  async getDashboardData(@Req() req) {
    const req_user = req.user as User;
    const user = await this.userRepository.findOne({ 
      where: { id: req_user.id },
      select: ['user_name', 'email', 'isEmailVerified', 'elo']
    });
    const friendRequests = await this.friendRequestRepository.find({
      where: { to_user_id: req_user.id },
      relations: ['sender'],
    });
    const friendsList = await this.friendListRepository.find({
      where: { user_id: req_user.id },
      relations: ['friend'],
    });
    return { user, friendRequests, friendsList };
  }
}
