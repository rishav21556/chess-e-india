import { Injectable, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { JwtAuthGuard } from './modules/auth/guard/auth.guard';
import { FriendRequest } from './entities/friend-request.entity';
import { FriendList } from './entities/friend-list.entity';
import { Game } from './entities/games.entity';


@Injectable()
export class AppService {
}
