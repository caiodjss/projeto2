import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

// Defina tipos para os arquivos
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (
    req: Request, 
    file: Express.Multer.File, 
    cb: FileNameCallback
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});