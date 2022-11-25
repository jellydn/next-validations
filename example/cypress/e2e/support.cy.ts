/// <reference types="cypress" />

export {};

context("/api/support", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should get error if missing type on query",  () => {
    return cy.request({
      method: "POST",
      url: "/api/support",
      failOnStatusCode: false,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Dung",
      }),
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });

  it("should get error when send invalid form data", () => {
    return cy.request({
      method: "POST",
      url: "/api/support?type=sms",
      failOnStatusCode: false,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Dung",
        phone: "12345679",
      }),
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });

  it("should return support information on valid data",  () => {
    return cy.request({
      method: "POST",
      url: "/api/support?type=email",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Dung",
        email: "dung@productsway.com",
        phone: "11223344",
      }),
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.name).equal("Dung");
      expect(response.body.email).equal("dung@productsway.com");
      expect(response.body.phone).equal("11223344");
      expect(response.body.type).equal("email");
    });
  });
});
