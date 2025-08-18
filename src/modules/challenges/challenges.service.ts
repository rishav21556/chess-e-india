import { Injectable } from '@nestjs/common';
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
    const existingChallenge = await this.challengesRepository.findOne({where: {id: id.toString()}});
    if (existingChallenge) {
      return this.challengesRepository.update(id, updateChallengeDto);
    }
  }

  remove(id: number) {
    return this.challengesRepository.delete(id);
  }
}
