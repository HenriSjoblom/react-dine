const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

describe('GET dine by id endpoint', ()=> {
  test('should return 200 if found', (done) => {
    request(app)
      .get('/api/dines/1')
      .expect(200)
      .end(done)
  });

  test('should return 200 and json if found', async () => {
    const response = await request(app)
      .get('/api/dines/1')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: 'Mac & Cheese',
        description: 'Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.'
      }),
    );
  });

  test('should return 404 and Not Found', async () => {
    const response = await request(app)
      .get('/api/dines/101')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(404);
    expect(response.text).toContain('Not Found');
  });
});


describe('POST dine endpoint', ()=> {

  const pool = require('../db/pool');
  afterAll(async () => {
    const deleteQuery = `DELETE FROM dines WHERE name LIKE 'Test Dine' AND description LIKE 'Test Description';`;
    const connection = await pool.getConnection();
    await connection.query(deleteQuery);
  });

  test('should create a new dine', async () => {
    const dine = {
      name: 'Test Dine',
      price: 10.99,
      description: 'Test Description',
    };

    const response = await request(app)
      .post('/api/dines')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(dine);

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toEqual('Test Dine');
    expect(response.body.price).toEqual(10.99);
    expect(response.body.description).toEqual('Test Description');
  });

  test('should not allow no name property', async () => {
    const dine = {
      description: 'Test Description',
      price: 10.88,
    };
    const response = await request(app)
      .post('/api/dines')
      .set('Accept', 'application/json')
      .send(dine);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"name" is required');
  });

  test('should not allow no description property', async () => {
    const dine = {
      name: 'Test Dine',
      price: 10.88,
    };
    const response = await request(app)
      .post('/api/dines')
      .set('Accept', 'application/json')
      .send(dine);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"description" is required');
  });

  test('should not allow empty name', async () => {
    const dine = {
      name: '',
      price: 5.99,
      description: 'Test text',
    };
    const response = await request(app)
      .post('/api/dines')
      .set('Accept', 'application/json')
      .send(dine);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"name" is not allowed to be empty');
  });

  test('should not allow a duplicate dine', async () => {
    const dine = {
      name: 'Mac & Cheese',
      price: 8.99,
      description: 'Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.',
    };
    const response = await request(app)
      .post('/api/dines')
      .set('Accept', 'application/json')
      .send(dine);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('Dine exist');
  });

});

describe('DELETE dines endpoint', () => {
  test('should delete the dine by id', async () => {
    const dine = {
      name: 'Test Dine Delete',
      price: 5.99,
      description: 'Test text',
    };
    const postResponse = await request(app)
      .post('/api/dines')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(dine);
    const postId = postResponse.body.id;

    console.log('postResponse : ', postResponse.body);
    const response = await request(app)
      .delete(`/api/dines/${postId}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Dine deleted');
  });

  test('should check that dine with id exists', async () => {
    const response = await request(app)
      .delete('/api/dines/100001')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Not Found');
  });

});


