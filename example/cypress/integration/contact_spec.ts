/// <reference types="cypress" />

export {};

context('Register API Route', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should get error when send empty data to /api/contact', async () => {
    cy.request({
      method: 'POST',
      url: '/api/contact',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Dung',
      }),
    }).then(response => {
      expect(response.status).equal(400);
      expect(response.body.details).contains({
        message: '"email" is required',
        path: ['email'],
        type: 'any.required',
        context: {
          label: 'email',
          key: 'email',
        },
      });
    });
  });

  it('should say contact a new user when send data to /api/contact', async () => {
    cy.request({
      method: 'POST',
      url: '/api/contact',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Dung',
        email: 'dung@productsway.com',
        dob: 1988,
      }),
    }).then(response => {
      expect(response.status).equal(200);
      expect(response.body.name).equal('Dung');
      expect(response.body.email).equal('dung@productsway.com');
      expect(response.body.dob).equal(1988);
    });
  });
});
