/// <reference types="cypress" />

export {};

context('Register API Route', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should get error when send empty data to /api/register', async () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }).then(response => {
      expect(response.status).equal(400);
      expect(response.body).contains({
        type: 'required',
        message: "The 'name' field is required.",
        field: 'name',
      });
    });
  });

  it('should say register a new user when send data to /api/register', async () => {
    cy.request({
      method: 'POST',
      url: '/api/register',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Dung',
        email: 'dung@productsway.com',
        age: 34,
      }),
    }).then(response => {
      expect(response.status).equal(200);
      expect(response.body.name).equal('Dung');
      expect(response.body.email).equal('dung@productsway.com');
      expect(response.body.age).equal(34);
    });
  });
});
