import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiarySchema } from './schema/diary.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Diary', schema: DiarySchema }]),
    AuthModule,
  ],
  providers: [DiaryService],
  controllers: [DiaryController],
})
export class DiaryModule {}
