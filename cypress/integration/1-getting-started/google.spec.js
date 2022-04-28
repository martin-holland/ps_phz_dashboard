const cypress = require("cypress");

describe("Login without UI", () => {
  it("should be able to login", () => {
    cy.login();
  });
});
