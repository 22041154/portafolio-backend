import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAboutDto {
  @IsString()
  @IsNotEmpty({ message: 'La semblanza no puede estar vacía' })
  texto!: string;
}