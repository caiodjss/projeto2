"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/course.routes.ts
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const router = (0, express_1.Router)();
// Rota pública (sem autenticação)
router.get('/', course_controller_1.getCourses);
// Rota protegida temporariamente (vamos ajustar depois)
router.post('/', course_controller_1.createCourse);
exports.default = router;
