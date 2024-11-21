import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/bussiness-errors/bussiness-errors.interceptor';
import { AirportService } from './airport.service';
import { AirportEntity } from './airport.entity/airport.entity';
import { plainToInstance } from 'class-transformer';
import { AirportDto } from './airport.dto/airport.dto';

@Controller('airports')
@UseInterceptors(BusinessErrorsInterceptor)
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Get()
  async getAirports() {
    return await this.airportService.findAll();
  }

  @Get(':airportId')
  async getAirportById(@Param('airportId') airportId: string) {
    return await this.airportService.findOne(airportId);
  }

  @Post()
  async createAirport(@Body() airportDto: AirportDto) {
    const airport: AirportEntity = plainToInstance(AirportEntity, airportDto);
    return await this.airportService.create(airport);
  }

  @Put(':airportId')
  async updateAirport(
    @Param('airportId') airportId: string,
    @Body() airportDto: AirportDto,
  ) {
    const airport: AirportEntity = plainToInstance(AirportEntity, airportDto);
    return await this.airportService.update(airportId, airport);
  }

  @Delete(':airportId')
  @HttpCode(204)
  async deleteAirport(@Param('airportId') airportId: string) {
    return await this.airportService.delete(airportId);
  }
}
