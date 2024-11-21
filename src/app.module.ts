import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirlineModule } from './airline/airline.module';
import { AirportModule } from './airport/airport.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineEntity } from './airline/airline.entity/airline.entity';
import { AirportEntity } from './airport/airport.entity/airport.entity';
import { AirlineAirportModule } from './airline-airport/airline-airport.module';

@Module({
  imports: [
    AirlineModule,
    AirportModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-db',
      port: 5432,
      username: 'airlineadmin',
      password: 'airlineadmin',
      database: 'airlinedb',
      entities: [AirlineEntity, AirportEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    AirlineAirportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
