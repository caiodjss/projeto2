import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { TipoUsuario, NivelCurso } from '@prisma/client';

export class LoginDto {
  @IsEmail()
  email: string | undefined;

  @IsString()
  @MinLength(6)
  senha: string | undefined;
}

export class CriarUsuarioDto {
  @IsString()
  @MinLength(3)
  nome: string | undefined;

  @IsEmail()
  email: string | undefined;

  @IsString()
  @MinLength(6)
  senha: string | undefined;

  @IsEnum(TipoUsuario)
  tipo: TipoUsuario | undefined;

  @IsString()
  @IsOptional()
  planoId?: string;
}