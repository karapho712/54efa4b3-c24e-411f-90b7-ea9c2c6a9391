import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  penaltyUntil: Date;
}
