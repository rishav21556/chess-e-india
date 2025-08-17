import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { FriendList } from 'src/entities/friend-list.entity';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest, FriendList])],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
