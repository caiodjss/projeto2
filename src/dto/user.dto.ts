import { IsEmail, IsEnum, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
  @MaxLength(100, { message: 'Nome não pode exceder 100 caracteres' })
  nome!: string;

  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'Senha deve conter: 1 letra maiúscula, 1 minúscula, 1 número e 1 símbolo',
    }
  )
  senha!: string;

  @IsEnum(['ALUNO', 'PROFESSOR', 'ADMIN'], { 
    message: 'Tipo deve ser ALUNO, PROFESSOR ou ADMIN' 
  })
  tipo!: 'ALUNO' | 'PROFESSOR' | 'ADMIN';
}

export class UpdateUserDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
  @MaxLength(100, { message: 'Nome não pode exceder 100 caracteres' })
  nome?: string;

  @IsEmail({}, { message: 'Email inválido' })
  email?: string;
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsString({ message: 'Senha deve ser uma string' })
  senha!: string;
}

export class ChangePasswordDto {
  @IsString({ message: 'Senha atual deve ser uma string' })
  senhaAtual!: string;

  @IsString({ message: 'Nova senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'Senha deve conter: 1 letra maiúscula, 1 minúscula, 1 número e 1 símbolo',
    }
  )
  novaSenha!: string;
}