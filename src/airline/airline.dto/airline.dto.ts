import { Type } from 'class-transformer';
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
  @Type(() => Date)
  readonly foundationDate: Date;

  @IsNotEmpty()
  @IsUrl()
  readonly website: string;
}
