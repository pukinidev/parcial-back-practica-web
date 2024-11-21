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
import { AirlineService } from './airline.service';
import { AirlineDto } from './airline.dto/airline.dto';
import { AirlineEntity } from './airline.entity/airline.entity';
import { plainToInstance } from 'class-transformer';

@Controller('airlines')
@UseInterceptors(BusinessErrorsInterceptor)
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @Get()
  async getAirlines() {
    return await this.airlineService.findAll();
  }

  @Get(':airlineId')
  async getAirlineById(@Param('airlineId') airlineId: string) {
    return await this.airlineService.findOne(airlineId);
  }

  @Post()
  async createAirline(@Body() airlineDto: AirlineDto) {
    const airline: AirlineEntity = plainToInstance(AirlineEntity, airlineDto);
    return await this.airlineService.create(airline);
  }

  @Put(':airlineId')
  async updateAirline(
    @Param('airlineId') airlineId: string,
    @Body() airlineDto: AirlineDto,
  ) {
    const airline: AirlineEntity = plainToInstance(AirlineEntity, airlineDto);
    return await this.airlineService.update(airlineId, airline);
  }

  @Delete(':airlineId')
  @HttpCode(204)
  async deleteAirline(@Param('airlineId') airlineId: string) {
    return await this.airlineService.delete(airlineId);
  }
}
