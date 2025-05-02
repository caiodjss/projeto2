"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../config/prisma");
const login = async (req, res, next) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.status(400).json({ erro: 'Email e senha são obrigatórios' });
            return;
        }
        const usuario = await prisma_1.prisma.usuario.findUnique({
            where: { email },
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true,
                tipo: true
            }
        });
        if (!usuario || !(await bcrypt_1.default.compare(senha, usuario.senha))) {
            res.status(401).json({ erro: 'Credenciais inválidas' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '8h' });
        const { senha: _, ...usuarioSemSenha } = usuario;
        res.json({ token, usuario: usuarioSemSenha });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
