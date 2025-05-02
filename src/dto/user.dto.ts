import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser uma string' })
  nome!: string;  // Note o ! para evitar erros de inicialização

  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsString({ message: 'Senha deve ser uma string' })
  senha!: string;

  @IsEnum(['ALUNO', 'PROFESSOR', 'ADMIN'], { 
    message: 'Tipo deve ser ALUNO, PROFESSOR ou ADMIN' 
  })
  tipo!: string;
}