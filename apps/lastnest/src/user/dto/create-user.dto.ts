import { Injectable } from '@nestjs/common';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
