import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { NivelCurso } from '@prisma/client';

export class CriarCursoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string | undefined;

  @IsString()
  @IsNotEmpty()
  professorId: string | undefined;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsEnum(NivelCurso)
  @IsOptional()
  categoria?: NivelCurso;

  @IsNumber()
  @IsOptional()
  cargaHoraria?: number;
}

export class AtualizarCursoDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsEnum(NivelCurso)
  @IsOptional()
  categoria?: NivelCurso;

  @IsNumber()
  @IsOptional()
  cargaHoraria?: number;
}