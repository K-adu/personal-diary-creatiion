import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, default: 'Normal' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
