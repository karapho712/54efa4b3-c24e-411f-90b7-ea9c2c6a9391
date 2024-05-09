import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterMemberDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  book?: boolean;
}
