import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsOptional } from 'class-validator';
import { MemberStatus } from 'src/types';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @IsOptional()
  code?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  status?: MemberStatus;
}
