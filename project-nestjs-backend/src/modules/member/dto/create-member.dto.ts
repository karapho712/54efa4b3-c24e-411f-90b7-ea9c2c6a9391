import { IsEnum, IsString } from 'class-validator';
import { MemberStatus } from 'src/types';

export class CreateMemberDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsEnum(MemberStatus)
  status: MemberStatus;
}
