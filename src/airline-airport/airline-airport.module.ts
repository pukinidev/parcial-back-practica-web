import { Module } from '@nestjs/common';
import { AirlineAirportService } from './airline-airport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineEntity } from 'src/airline/airline.entity/airline.entity';
import { AirportEntity } from 'src/airport/airport.entity/airport.entity';
import { AirlineAirportController } from './airline-airport.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AirlineEntity, AirportEntity])],
  providers: [AirlineAirportService],
  controllers: [AirlineAirportController],
})
export class AirlineAirportModule {}
