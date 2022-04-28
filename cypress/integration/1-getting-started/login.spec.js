describe("The Promoter Score Form", () => {
  beforeEach(() => {});

  it("Login User with VALID Google credentials", () => {
    //cy.get("div[id=google-signin]").should("be.visible");
    cy.login();
    cy.visit("/");
    cy.get("button[id = google-signin]").click();
    cy.get("div[class=datefilter-box]").should("be.visible");
  });
  /* it("Login User with INVALID Google credentials", () => {
    cy.get("div[id=welcome]").should("be.visible");
    cy.get("button[id = google-signin]", { timeout: 10000 }).click();
    cy.get("div[id= Xb9hP]")
      .get("class=[whsOnd zHQkBf]")
      .type("matta.amrita@gmail.com");
    cy.get("");
  });
   */
});
