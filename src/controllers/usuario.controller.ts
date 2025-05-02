import { Request, Response } from 'express';
import prisma from '../config/database';

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    // Consulta os usuários e seleciona os campos necessários
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        dataCadastro: true,
        dataAtualizacao: true,
        // Não inclui a senha nos resultados
      },
    });

    // Verifique se a consulta retornou algum usuário
    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado' });
    }

    // Retorna a lista de usuários
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, email, senha, tipo' });
    }

    // Cria o usuário
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        tipo,
        plano: undefined,
      },
    });

    // Retorna o novo usuário criado
    res.status(201).json(novoUsuario);
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: error.message || 'Erro interno' });
  }
};
