"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});
// Adicione outras rotas CRUD...
exports.default = router;
