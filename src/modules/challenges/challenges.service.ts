import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge, ChallengeStatus } from 'src/entities/challenge.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
  ) {}

  create(createChallengeDto: CreateChallengeDto) {
    const challenge = this.challengesRepository.create(createChallengeDto);
    return this.challengesRepository.save(challenge);
  }

  findAll() {
    return this.challengesRepository.find();
  }

  findOne(id: number) {
    return this.challengesRepository.findOne({
      where:{
        id: id.toString(),
      }
    });
  }

  async update(id: number, updateChallengeDto: Challenge) {
    return this.challengesRepository.manager.transaction(async (manager) => {
      const existingChallenge = await manager.findOne(Challenge, {where: {id: id.toString()}});
      if (!existingChallenge){throw new NotFoundException('Challenge not found');}
      if (existingChallenge.status == ChallengeStatus.CANCELLED){
        throw new BadRequestException('Cannot update a cancelled challenge');
        }
      if (existingChallenge.status == ChallengeStatus.REJECTED || existingChallenge.status == ChallengeStatus.ACCEPTED) {
        throw new BadRequestException('Cannot update a rejected or accepted challenge');
        }
      if (existingChallenge.status !== ChallengeStatus.PENDING) {
        throw new BadRequestException('Cannot update a non-pending challenge');
        }
      return manager.update(Challenge, id, updateChallengeDto);
    });
  }

  remove(id: number) {
    return this.challengesRepository.delete(id);
  }
}
