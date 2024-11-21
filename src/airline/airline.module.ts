import { Module } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineEntity } from './airline.entity/airline.entity';
import { AirlineController } from './airline.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AirlineEntity])],
  providers: [AirlineService],
  controllers: [AirlineController],
})
export class AirlineModule {}
