import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterMemberDto {
  @ApiProperty({
    required: false,
    type: 'string',
    example: 'true',
    description: 'only accept string true',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  book?: boolean;
}
