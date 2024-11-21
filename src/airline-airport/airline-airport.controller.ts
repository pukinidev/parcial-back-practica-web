import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/bussiness-errors/bussiness-errors.interceptor';
import { AirlineAirportService } from './airline-airport.service';

@Controller('airlines')
@UseInterceptors(BusinessErrorsInterceptor)
export class AirlineAirportController {
  constructor(private readonly airlineAirportService: AirlineAirportService) {}
}
