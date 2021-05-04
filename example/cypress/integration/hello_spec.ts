/// <reference types="cypress" />

export {};

context('Hello API Route', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should get error when navigate to /api/hello', async () => {
    cy.request({
      method: 'GET',
      url: '/api/hello',
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).equal(400);
      expect(response.body.message).equal('name is a required field');
    });
  });

  it('should say hello name when navigate to /api/hello?name=Dung', async () => {
    cy.request({
      method: 'GET',
      url: '/api/hello?name=Dung',
    }).then(response => {
      expect(response.status).equal(200);
      expect(response.body.name).equal('Dung');
    });
  });
});
