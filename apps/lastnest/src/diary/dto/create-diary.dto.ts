import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateDiaryDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isLocked: boolean;

  @IsOptional()
  @IsString()
  secretKey: string;
}
