/// <reference types="cypress" />

export { };

context("/api/greeter", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should get error when navigate to /api/greeter", () => {
    return cy.request({
      method: "GET",
      url: "/api/greeter",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
    });
  });

  it("should say greeter name when navigate to /api/greeter?name=Dung", () => {
    return cy.request({
      method: "GET",
      url: "/api/greeter?name=Dung",
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.name).equal("Dung");
    });
  });
});
