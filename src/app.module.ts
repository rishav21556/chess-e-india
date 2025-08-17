import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './entities/users.entity';
import { FriendRequest } from './entities/friend-request.entity';
import { FriendList } from './entities/friend-list.entity';
import { Game } from './entities/games.entity';
@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([User, FriendRequest, FriendList, Game]),
    // Configure TypeORM with PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}