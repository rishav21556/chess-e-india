import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendList } from 'src/entities/friend-list.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { Game } from 'src/entities/games.entity';
import { User } from 'src/entities/users.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
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
  async getDashboardData(req_user_id : string) {
    const user = await this.userRepository.findOne({ 
      where: { id: req_user_id },
      select: ['user_name', 'email', 'isEmailVerified', 'elo']
    });
    const friendRequests = await this.friendRequestRepository.find({
      where: { to_user_id: req_user_id },
      relations: ['sender'],
    });
    const friendsList = await this.friendListRepository.find({
      where: { user_id: req_user_id },
      relations: ['friend'],
    });
    const games = await this.gameRepository.find({
      where: [
      { black_user_id: req_user_id },
      { white_user_id: req_user_id }
      ],
      relations: ['whiteUser', 'blackUser'],
      order: { createdAt: 'DESC' },
      take: 5,
    });
    return { user, friendRequests, friendsList, games };
  }
  
  async searchUserName(partialUserName?: string) {
    const user_names = await this.userRepository.find({
      where: { user_name: Like(`%${partialUserName}%`) },
      select: ['id', 'user_name', 'elo', 'email'],
    });
    return user_names;
  }
}
