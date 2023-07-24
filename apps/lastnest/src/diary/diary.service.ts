import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Diary } from './schema/diary.schema';
import mongoose from 'mongoose';
import { CreateDiaryDTO } from './dto/create-diary.dto';
import { start } from 'repl';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private diaryModel: mongoose.Model<Diary>,
  ) {}

  async createDiary(data: CreateDiaryDTO, userId) {
    const date = new Date();
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const diary = {
      ...data,
      addedBy: userId,
    };
    const diaryExist = await this.diaryModel.find({
      addedBy: userId,
      dateField: { $gte: startDate, $lte: endDate },
    });
    console.log('diary exist', diaryExist);
    if (diaryExist.length > 0) {
      throw new BadRequestException(
        'you canot create more than one diary per day',
      );
    }
    return this.diaryModel.create(diary);
  }
  async readDiary(user, date: Date) {
    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Please provide a valid date.',
      );
    }
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    console.log('this is from the diary service printing', user.sub);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    return this.diaryModel.find({
      addedBy: user.sub,
      dateField: { $gte: startDate, $lte: endDate },
    });
  }

  async updateDiary(data: CreateDiaryDTO, diaryId: string) {
    return this.diaryModel.findByIdAndUpdate(diaryId, data);
  }
}
