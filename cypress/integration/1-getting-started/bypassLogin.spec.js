describe("Login without UI", () => {
  it("should be able to login", () => {
    cy.request({
      url: "https://www.googleapis.com/oauth2/v4/token",
      method: "POST",
      body: {
        user: { email: "npstestglory@gmail.com", password: "aR7FsedNirgrM2K" },
      },
    })
      .its("body")
      .then((res) => localStorage.setItem(res.user.token));
    cy.visit("http://localhost:3000/dashboard");
  });
});
