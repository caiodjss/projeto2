import { Router } from 'express';
import {
  createCourse, // 
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '../controllers/course.controller'; // Verifique o caminho

const router = Router();

// Rotas
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse); // Corrigido
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;