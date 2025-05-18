import request from 'supertest';
import { app } from '../src/app'; // Importação nomeada

describe('Auth Controller', () => {
  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'professor@example.com',
        password: 'senha123',
        role: 'teacher'
      });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});