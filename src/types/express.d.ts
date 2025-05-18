// types/express/index.d.ts
import { User } from '../models/User'; // ou defina o tipo manualmente

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
        // adicione outros campos se necessário
      };
    }
  }
}
