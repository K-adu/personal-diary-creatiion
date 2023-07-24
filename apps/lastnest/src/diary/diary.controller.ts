import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateDiaryDTO } from './dto/create-diary.dto';
import { DiaryService } from './diary.service';
import { AuthGuard } from '../auth/guards/auth-guard.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enum/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  async createDiary(@Body() data: CreateDiaryDTO, @Request() req) {
    const userId = req.user.sub;
    return await this.diaryService.createDiary(data, userId);
  }

  @Get('/read')
  @UseGuards(AuthGuard)
  async readDiary(@Query() query, @Request() req) {
    const date = new Date(query.date);
    console.log(date);
    return await this.diaryService.readDiary(req.user, date);
  }

  @Patch('/admin/update')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  async updateDiary() {}
}
