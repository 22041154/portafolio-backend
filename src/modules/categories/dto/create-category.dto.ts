import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la categoría no puede estar vacío' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 letras' })
  name!: string;
}