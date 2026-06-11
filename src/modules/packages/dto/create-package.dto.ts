import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  etiqueta!: string;

  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsNumber()
  @IsNotEmpty()
  precio!: number;

  @IsArray()
  caracteristicas!: string[];
}