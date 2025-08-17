import { Injectable, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { JwtAuthGuard } from './modules/auth/guard/auth.guard';
import { FriendRequest } from './entities/friend-request.entity';
import { FriendList } from './entities/friend-list.entity';
import { Game } from './entities/games.entity';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(FriendList)
    private friendListRepository: Repository<FriendList>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
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
    const games = await this.gameRepository.find({
      where: [
      { black_user_id: req_user.id },
      { white_user_id: req_user.id }
      ],
      relations: ['whiteUser', 'blackUser'],
      order: { createdAt: 'DESC' },
      take: 5,
    });
    return { user, friendRequests, friendsList, games };
  }
}
