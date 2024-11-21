import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirportEntity } from './airport.entity/airport.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(AirportEntity)
    private readonly airportRepository: Repository<AirportEntity>,
  ) {}

  async findAll(): Promise<AirportEntity[]> {
    return await this.airportRepository.find();
  }

  async findOne(id: string): Promise<AirportEntity> {
    const airport = await this.airportRepository.findOne({
      where: { id },
      relations: ['airlines'],
    });
    if (!airport) {
      throw new BusinessLogicException(
        'Airport not found',
        BusinessError.NOT_FOUND,
      );
    }
    return airport;
  }

  async create(airport: AirportEntity): Promise<AirportEntity> {
    if (airport.code.length !== 3) {
      throw new BusinessLogicException(
        'Airport code must have 3 characters',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.airportRepository.save(airport);
  }

  async update(id: string, airport: AirportEntity): Promise<AirportEntity> {
    const persistedAirport = await this.airportRepository.findOne({
      where: { id },
    });
    if (!persistedAirport) {
      throw new BusinessLogicException(
        'Airport not found',
        BusinessError.NOT_FOUND,
      );
    }

    if (airport.code.length !== 3) {
      throw new BusinessLogicException(
        'Airport code must have 3 characters',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    airport.id = id;
    return await this.airportRepository.save(airport);
  }

  async delete(id: string): Promise<void> {
    const persistedAirport = await this.airportRepository.findOne({
      where: { id },
    });
    if (!persistedAirport) {
      throw new BusinessLogicException(
        'Airport not found',
        BusinessError.NOT_FOUND,
      );
    }
    await this.airportRepository.delete(id);
  }
}
