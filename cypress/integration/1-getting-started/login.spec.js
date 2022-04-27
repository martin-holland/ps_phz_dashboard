describe("The Promoter Score Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Login User with VALID Google credentials", () => {
    cy.get("div[id=welcome]").should("be.visible");
    cy.wait(5000);
    cy.get("button[id = google-signin]").click();
    cy.get("span#class=VfPpkd-vQzf8d").should("be.visible");
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
