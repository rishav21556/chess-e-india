import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { User } from 'src/entities/users.entity';
import { FriendList } from 'src/entities/friend-list.entity';
import { Game } from 'src/entities/games.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest, FriendList, Game])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
