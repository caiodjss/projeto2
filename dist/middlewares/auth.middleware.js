"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Token inválido';
        return res.status(401).json({ error: errorMessage });
    }
};
exports.authenticate = authenticate;
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user?.role) {
            return res.status(403).json({ error: 'Usuário não autenticado' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: `Acesso restrito a: ${allowedRoles.join(', ')}`,
                seuPerfil: req.user.role
            });
        }
        next();
    };
};
exports.authorize = authorize;
