import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../config/database';
import { generateToken } from '../config/auth';
import { TipoUsuario } from '@prisma/client';

const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

const CriarUsuarioSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(6),
  tipo: z.nativeEnum(TipoUsuario),
  planoId: z.string().optional(),
});

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = LoginSchema.parse(req.body);

    const usuario = await prisma.usuario.findUnique({ 
      where: { email },
    });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken({
      id: usuario.id,
      tipo: usuario.tipo,
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    res.json({ token, usuario: usuarioSemSenha });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const dadosValidados = CriarUsuarioSchema.parse(req.body);
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
    const senhaHash = await bcrypt.hash(dadosValidados.senha, saltRounds);

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: dadosValidados.email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: dadosValidados.nome,
        email: dadosValidados.email,
        senha: senhaHash,
        tipo: dadosValidados.tipo,
        planoId: dadosValidados.planoId || null,
      },
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        tipo: true, 
        dataCadastro: true,
        plano: {
          select: {
            id: true,
            nome: true
          }
        }
      },
    });

    const token = generateToken({
      id: novoUsuario.id,
      tipo: novoUsuario.tipo,
    });

    res.status(201).json({ usuario: novoUsuario, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};