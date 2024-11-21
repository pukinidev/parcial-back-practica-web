import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlineEntity } from 'src/airline/airline.entity/airline.entity';
import { AirportEntity } from 'src/airport/airport.entity/airport.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class AirlineAirportService {
  constructor(
    @InjectRepository(AirlineEntity)
    private readonly airlineRepository: Repository<AirlineEntity>,

    @InjectRepository(AirportEntity)
    private readonly airportRepository: Repository<AirportEntity>,
  ) {}

  async addAirportToAirline(
    airlineId: string,
    airportId: string,
  ): Promise<AirlineEntity> {
    const airline = await this.airlineRepository.findOne({
      where: { id: airlineId },
      relations: ['airports'],
    });

    if (!airline) {
      throw new BusinessLogicException(
        'Airline not found',
        BusinessError.NOT_FOUND,
      );
    }

    const airport = await this.airportRepository.findOne({
      where: { id: airportId },
    });

    if (!airport) {
      throw new BusinessLogicException(
        'Airport not found',
        BusinessError.NOT_FOUND,
      );
    }

    airline.airports = [...airline.airports, airport];
    return await this.airlineRepository.save(airline);
  }

  async findAirportsFromAirline(airlineId: string): Promise<AirportEntity[]> {
    const airline = await this.airlineRepository.findOne({
      where: { id: airlineId },
      relations: ['airports'],
    });

    if (!airline) {
      throw new BusinessLogicException(
        'Airline not found',
        BusinessError.NOT_FOUND,
      );
    }

    return airline.airports;
  }

  async findAirportFromAirline(
    airlineId: string,
    airportId: string,
  ): Promise<AirportEntity> {
    const airline = await this.airlineRepository.findOne({
      where: { id: airlineId },
      relations: ['airports'],
    });

    if (!airline) {
      throw new BusinessLogicException(
        'Airline not found',
        BusinessError.NOT_FOUND,
      );
    }

    const airport = airline.airports.find(
      (airport) => airport.id === airportId,
    );

    if (!airport) {
      throw new BusinessLogicException(
        'Airport not found',
        BusinessError.NOT_FOUND,
      );
    }

    return airport;
  }

  async updateAirportsFromAirline(
    airlineId: string,
    airports: AirportEntity[],
  ): Promise<AirlineEntity> {
    const airline = await this.airlineRepository.findOne({
      where: { id: airlineId },
      relations: ['airports'],
    });

    if (!airline) {
      throw new BusinessLogicException(
        'Airline not found',
        BusinessError.NOT_FOUND,
      );
    }

    for (const airport of airports) {
      const airportEntity = await this.airportRepository.findOne({
        where: { id: airport.id },
      });

      if (!airportEntity) {
        throw new BusinessLogicException(
          'Airport not found',
          BusinessError.NOT_FOUND,
        );
      }
    }

    airline.airports = airports;
    return await this.airlineRepository.save(airline);
  }

  async deleteAirportFromAirline(
    airlineId: string,
    airportId: string,
  ): Promise<AirlineEntity> {
    const airline = await this.airlineRepository.findOne({
      where: { id: airlineId },
      relations: ['airports'],
    });

    if (!airline) {
      throw new BusinessLogicException(
        'Airline not found',
        BusinessError.NOT_FOUND,
      );
    }

    const airport = await this.airportRepository.findOne({
      where: { id: airportId },
    });

    if (!airport) {
      throw new BusinessLogicException(
        'Airport not found',
        BusinessError.NOT_FOUND,
      );
    }

    const airlineAirport: AirportEntity = airline.airports.find(
      (airport) => airport.id === airportId,
    );

    if (!airlineAirport) {
      throw new BusinessLogicException(
        'Airport not found in airline',
        BusinessError.NOT_FOUND,
      );
    }

    airline.airports = airline.airports.filter(
      (airport) => airport.id !== airportId,
    );

    return await this.airlineRepository.save(airline);
  }
}
