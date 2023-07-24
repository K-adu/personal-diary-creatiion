import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async findUserByEmail(email: string) {
    console.log(email);
    return await this.userModel.findOne({ email });
  }

  async createUser(data: CreateUserDTO) {
    /* setting the roles value to normal cause if 
    user signins from the signup method 
    the role is normal
    */
    const createUser = {
      ...data,
      roles: 'Normal',
    };
    return await this.userModel.create(createUser);
  }
}
