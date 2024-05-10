import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsOptional } from 'class-validator';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @IsOptional()
  code?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  penaltyUntil?: Date;
}
