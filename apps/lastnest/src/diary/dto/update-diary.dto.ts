import { IsOptional, IsString } from 'class-validator';

export class updateDiaryDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
