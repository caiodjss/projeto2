"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getCourses = void 0;
const prisma_1 = require("../config/prisma");
/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gerenciamento de cursos acadêmicos
 */
const getCourses = async (req, res) => {
    try {
        const cursos = await prisma_1.prisma.curso.findMany({
            include: {
                professor: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                },
                alunos: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(cursos);
    }
    catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
};
exports.getCourses = getCourses;
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await prisma_1.prisma.curso.findUnique({
            where: { id },
            include: {
                professor: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                },
                alunos: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        res.json(curso);
    }
    catch (error) {
        console.error('Erro ao buscar curso:', error);
        res.status(500).json({ error: 'Erro ao buscar curso' });
    }
};
exports.getCourseById = getCourseById;
const createCourse = async (req, res) => {
    const { titulo, professorId, descricao, categoria, cargaHoraria } = req.body;
    if (!titulo || !professorId) {
        return res.status(400).json({ error: 'Título e ID do professor são obrigatórios' });
    }
    if (titulo.length < 3) {
        return res.status(400).json({ error: 'O título deve ter pelo menos 3 caracteres' });
    }
    try {
        const professorExists = await prisma_1.prisma.professor.findUnique({
            where: { id: professorId }
        });
        if (!professorExists) {
            return res.status(400).json({ error: 'Professor não encontrado' });
        }
        const curso = await prisma_1.prisma.curso.create({
            data: {
                titulo,
                descricao: descricao || null,
                categoria: categoria || null,
                cargaHoraria: cargaHoraria ? Number(cargaHoraria) : null,
                professorId
            },
            include: {
                professor: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                },
                alunos: true
            }
        });
        res.status(201).json(curso);
    }
    catch (error) {
        console.error('Erro ao criar curso:', error);
        res.status(500).json({ error: 'Erro ao criar curso' });
    }
};
exports.createCourse = createCourse;
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { titulo, professorId, descricao, categoria, cargaHoraria } = req.body;
    try {
        const cursoExistente = await prisma_1.prisma.curso.findUnique({
            where: { id },
            include: {
                professor: {
                    select: {
                        id: true
                    }
                }
            }
        });
        if (!cursoExistente) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        if (professorId && professorId !== cursoExistente.professorId) {
            const professorExistente = await prisma_1.prisma.professor.findUnique({
                where: { id: professorId }
            });
            if (!professorExistente) {
                return res.status(400).json({ error: 'Professor não encontrado' });
            }
        }
        if (titulo && titulo.length < 3) {
            return res.status(400).json({ error: 'O título deve ter pelo menos 3 caracteres' });
        }
        const cursoAtualizado = await prisma_1.prisma.curso.update({
            where: { id },
            data: {
                titulo: titulo ?? cursoExistente.titulo,
                descricao: descricao ?? cursoExistente.descricao,
                categoria: categoria ?? cursoExistente.categoria,
                cargaHoraria: cargaHoraria ? Number(cargaHoraria) : cursoExistente.cargaHoraria,
                professorId: professorId ?? cursoExistente.professorId
            },
            include: {
                professor: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                },
                alunos: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });
        res.json(cursoAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
};
exports.updateCourse = updateCourse;
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await prisma_1.prisma.curso.findUnique({
            where: { id },
            include: {
                alunos: {
                    select: {
                        id: true
                    }
                }
            }
        });
        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        if (curso.alunos && curso.alunos.length > 0) {
            return res.status(400).json({ error: 'Não é possível excluir um curso com alunos matriculados' });
        }
        await prisma_1.prisma.curso.delete({ where: { id } });
        res.status(204).end();
    }
    catch (error) {
        console.error('Erro ao excluir curso:', error);
        res.status(500).json({ error: 'Erro ao excluir curso' });
    }
};
exports.deleteCourse = deleteCourse;
