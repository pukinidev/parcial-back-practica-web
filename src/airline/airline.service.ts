import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlineEntity } from './airline.entity/airline.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/business-errors';

@Injectable()
export class AirlineService {
  constructor(
    @InjectRepository(AirlineEntity)
    private readonly airlineRepository: Repository<AirlineEntity>,
  ) {}

  async findAll(): Promise<AirlineEntity[]> {
    return await this.airlineRepository.find({ relations: ['airports'] });
  }

  async findOne(id: string): Promise<AirlineEntity> {
    const airline = await this.airlineRepository.findOne({
      where: { id },
      relations: ['airports'],
    });

    if (!airline) {
      throw new BusinessLogicException(
        'Airline not found',
        BusinessError.NOT_FOUND,
      );
    }

    return airline;
  }

  async create(airline: AirlineEntity): Promise<AirlineEntity> {
    return await this.airlineRepository.save(airline);
  }

  async update(id: string, airline: AirlineEntity): Promise<AirlineEntity> {
    const persistedAirline = await this.airlineRepository.findOne({
      where: { id },
    });

    if (!persistedAirline) {
      throw new BusinessLogicException(
        'Airline not found',
        BusinessError.NOT_FOUND,
      );
    }
    airline.id = id;
    return await this.airlineRepository.save(airline);
  }

  async delete(id: string): Promise<void> {
    const persistedAirline = await this.airlineRepository.findOne({
      where: { id },
    });

    if (!persistedAirline) {
      throw new BusinessLogicException(
        'Airline not found',
        BusinessError.NOT_FOUND,
      );
    }

    await this.airlineRepository.delete(id);
  }
}
