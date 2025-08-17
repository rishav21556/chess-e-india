import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { FriendList } from 'src/entities/friend-list.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(FriendList)
    private friendListRepository: Repository<FriendList>,
  ) {}

  async GetAllFriendRequest(){
    return await this.friendRequestRepository.find();
  }

  async GetAllFriends(){
    return await this.friendListRepository.find();
  }

  async SendFriendRequest(userId, req_friend_user: string) {
    const friendRequest = this.friendRequestRepository.create({
      from_user_id: userId,
      to_user_id: req_friend_user,
    });
    return await this.friendRequestRepository.save(friendRequest);
  }

  async AcceptFriendRequest(userId: string, requestId: string) {
    await this.friendRequestRepository.update(requestId, { status: 'accepted' });
    const friendList = this.friendListRepository.create({
      user_id: userId,
      friend_id: requestId,
    });
    return await this.friendListRepository.save(friendList);
  }

  async RejectFriendRequest(userId: string, requestId: string) {
    await this.friendRequestRepository.update(requestId, { status: 'rejected' });
    return { message: 'Friend request rejected' };
  }
}
