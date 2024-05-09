import { Controller, Get, Param, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { FilterMemberDto } from './dto/filter-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll(@Query() options: FilterMemberDto) {
    return this.memberService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }
}
