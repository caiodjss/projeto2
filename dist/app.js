"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const prisma_1 = require("./config/prisma");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return prisma_1.prisma; } });
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json()); // 
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.get('/', (req, res) => {
    res.json({ message: 'API da Plataforma EAD' });
});
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});
app.use('/api/usuarios', usuarioRoutes_1.default);
app.use('/api/cursos', course_routes_1.default);
app.use('/api/auth', auth_routes_1.default); //
