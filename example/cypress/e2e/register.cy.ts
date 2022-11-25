/// <reference types="cypress" />

export {};

context("/api/register", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should get error when send empty data", async () => {
    cy.request({
      method: "POST",
      url: "/api/register",
      failOnStatusCode: false,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((response) => {
      expect(response.status).equal(400);
   });
  });

  it("should say register a new user when send valid data", async () => {
    cy.request({
      method: "POST",
      url: "/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Dung",
        email: "dung@productsway.com",
        age: 34,
      }),
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.name).equal("Dung");
      expect(response.body.email).equal("dung@productsway.com");
      expect(response.body.age).equal(34);
    });
  });
});
