import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async createDiary(data: CreateDiaryDTO, user) {
    const date = new Date();
    const diaryExist = await this.findByDate(user, date);
    const diary = {
      ...data,
      addedBy: user.sub,
    };
    if (diaryExist) {
      throw new BadRequestException(
        'you canot create more than one diary per day',
      );
    }
    return await this.diaryModel.create(diary);
  }

  async readDiary(user, date: Date) {
    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Please provide a valid date.',
      );
    }
    console.log('till here reached');
    const diary = await this.findByDate(user, date);

    if (diary.isLocked === true) {
      throw new UnauthorizedException(
        'This diary is locked you need secret key to unlock this',
      );
    }
    return diary;
  }

  async readLockedDiary(user, key: string, date: Date) {
    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Please provide a valid date.',
      );
    }
    const diary = await this.findByDate(user, date);
    if (diary.secretKey !== key) {
      throw new UnauthorizedException('the secret key is invalid');
    }
    return diary;
  }

  async updateDiary(data: CreateDiaryDTO, diaryId: string) {
    return this.diaryModel.findByIdAndUpdate(diaryId, data);
  }

  async findKey(userId: string, key: string) {
    return this.diaryModel.findById({ addedBy: userId, secretkey: key });
  }

  async findByDate(user, date: Date) {
    console.log(user);
    console.log(date);
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    const diary = await this.diaryModel.findOne({
      addedBy: user.sub,
      dateField: { $gte: startDate, $lte: endDate },
    });
    console.log(diary);
    return diary;
  }
}
