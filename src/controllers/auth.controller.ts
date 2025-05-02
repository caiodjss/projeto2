import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.status(400).json({ erro: 'Email e senha são obrigatórios' });
      return;
    }

    const usuario = await prisma.usuario.findUnique({ 
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        tipo: true
      }
    });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      res.status(401).json({ erro: 'Credenciais inválidas' });
      return;
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET!,
      { expiresIn: '8h' }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;
    res.json({ token, usuario: usuarioSemSenha });

  } catch (error) {
    next(error);
  }
};