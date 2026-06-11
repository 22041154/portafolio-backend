import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  camara!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @IsUrl({}, { message: 'Debe ser un enlace (URL) válido' })
  @IsNotEmpty()
  url!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;
}