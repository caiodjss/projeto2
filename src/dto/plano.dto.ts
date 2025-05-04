import { z } from 'zod';

export const CriarPlanoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  preco: z.number().min(0, "Preço não pode ser negativo").optional()
});

export type CriarPlanoDto = z.infer<typeof CriarPlanoSchema>;

export const AtualizarPlanoSchema = z.object({
  nome: z.string().min(3).optional(),
  descricao: z.string().min(10).optional(),
  preco: z.number().min(0).optional()
});

export type AtualizarPlanoDto = z.infer<typeof AtualizarPlanoSchema>;