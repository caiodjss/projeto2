"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
const server = app_1.app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
// Fechar conexões adequadamente
process.on('SIGTERM', async () => {
    await app_1.prisma.$disconnect();
    server.close(() => {
        console.log('Servidor encerrado');
    });
});
