import { IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';
export class AirlineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  fundationDate: Date;

  @IsNotEmpty()
  @IsUrl()
  website: string;
}