import { IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';
export class AirlineDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDate()
  readonly foundationDate: Date;

  @IsNotEmpty()
  @IsUrl()
  readonly website: string;
}
