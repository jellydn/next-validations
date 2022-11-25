/// <reference types="cypress" />

export {};

context("/api/hello", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should get error when navigate to /api/hello", () => {
    return cy.request({
      method: "GET",
      url: "/api/hello",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });

  it("should say hello name when navigate to /api/hello?name=Dung", () => {
    return cy.request({
      method: "GET",
      url: "/api/hello?name=Dung",
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.name).equal("Dung");
    });
  });
});
