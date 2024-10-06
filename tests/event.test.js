const request = require('supertest');
const app = require('../app');

describe('Event Ticket Booking System', () => {
  it('should initialize an event', async () => {
    const response = await request(app)
      .post('/initialize')
      .send({ name: 'Concert', totalTickets: 100 });
    expect(response.statusCode).toBe(201);
    expect(response.body.event.name).toBe('Concert');
  });

  it('should book a ticket', async () => {
    const response = await request(app)
      .post('/book')
      .send({ eventId: 1, userId: 1 });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Ticket booked successfully');
  });

  it('should return event status', async () => {
    const response = await request(app).get('/status/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.remainingTickets).toBeGreaterThan(0);
  });
});
