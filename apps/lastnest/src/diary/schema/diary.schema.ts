import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'apps/lastnest/src/user/schema/user.schema';
import mongoose from 'mongoose';

@Schema()
export class Diary {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  addedBy: User[];

  @Prop({ type: Date, required: true, default: Date.now })
  dateField: Date;

  @Prop({ type: String })
  role: string;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
