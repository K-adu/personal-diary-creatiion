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

  // @Prop()
  // roles: Role
}

export const UserSchema = SchemaFactory.createForClass(User);
