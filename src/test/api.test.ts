
import request from 'supertest';
import app from '../app';

describe('Test the messages router', () => {
  describe('POST /send_message', () => {
    it('should send message successfully', async () => {
      const response = await request(app)
        .post('/messages/send_message')
        .send({
          category: 'SPORTS',
          message: 'Hello World',
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual('Message Sent and Logs History Created');
      // TODO: check for message being sent via SMS, email, and notification
    });

    it('should handle errors while sending message', async () => {
      const response = await request(app)
        .post('/messages/send_message')
        .send({
          Category: 'news',
          message: 'Hello World',
        });
      expect(response.status).toBe(500);
      // TODO: check for proper error message
    });
  });

  describe('GET /logs', () => {
    it('should fetch log history successfully', async () => {
      const response = await request(app).get('/messages/logs');
      expect(response.status).toBe(200);
      // TODO: check for proper log data format
    });

  });
});

describe('Message endpoints', () => {
  describe('POST /send_message', () => {
    it('should send messages to subscribed users and create log history', async () => {
      const response = await request(app)
        .post('/messages/send_message')
        .send({ category: 'SPORTS', message: 'Test message' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual('Message Sent and Logs History Created');
    });

    it('should return 404 if not found', async () => {
      const response = await request(app)
        .post('/send_message')
        .send({ category: 'INVALID', message: 'Test message' });
      expect(response.status).toBe(404);
    });
  });

  describe('GET /logs', () => {
    it('should return log history with user details', async () => {
      const response = await request(app).get('/messages/logs');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('User');
      expect(response.body[0].User).toHaveProperty('name');
      expect(response.body[0].User).toHaveProperty('email');
    });

    it('should return 404 and error message if not found', async () => {
      const response = await request(app).get('/INVALID');
      expect(response.status).toBe(404);
    });
  });
});

