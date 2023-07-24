import { IsString } from 'class-validator';

export class CreateDiaryDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
