import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsString()
  title: string;

  @IsString()
  status: string;
}
