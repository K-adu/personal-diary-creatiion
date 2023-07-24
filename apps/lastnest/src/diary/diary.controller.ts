import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateDiaryDTO } from './dto/create-diary.dto';
import { DiaryService } from './diary.service';
import { AuthGuard } from '../auth/guards/auth-guard.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enum/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { updateDiaryDTO } from './dto/update-diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  async createDiary(@Body() data: CreateDiaryDTO, @Request() req) {
    return await this.diaryService.createDiary(data, req.user);
  }

  @Get('/read')
  @UseGuards(AuthGuard)
  async readDiary(@Query() query, @Request() req) {
    const date = new Date(query.date);
    console.log(date);
    return await this.diaryService.readDiary(req.user, date);
  }

  @Get('/read/:key')
  @UseGuards(AuthGuard)
  async readLockedDiary(
    @Query() query,
    @Request() req,
    @Param('key') key: string,
  ) {
    const date = new Date(query.date);
    return await this.diaryService.readLockedDiary(req.user, key, date);
  }

  @Patch('/admin/update/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateDiary(@Body() data: updateDiaryDTO, @Param('id') id: string) {
    return this.diaryService.updateDiary(data, id);
  }
}
