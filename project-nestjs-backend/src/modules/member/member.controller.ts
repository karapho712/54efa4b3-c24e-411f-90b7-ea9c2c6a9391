import { Controller, Get, Param, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { FilterMemberDto } from './dto/filter-member.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({ summary: 'Get All Member' })
  @Get()
  findAll(@Query() options: FilterMemberDto) {
    return this.memberService.findAll(options);
  }

  @ApiOperation({ summary: 'Get a Member' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }
}
