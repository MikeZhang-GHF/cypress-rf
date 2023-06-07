/// <reference types="Cypress" />

describe("template spec", () => {
  it.skip("should render the main image", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".main-header img"); // get element
    // cy.get('.main-header').find('img'); // try to find img in main-header, also works
  });

  it.skip("should display the page title", () => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").should("have.length", 1);
    cy.get("h1").contains("My Cypress Course Tasks");
    // cy.contains('My Cypress Course Tasks')
  });

  it.skip("should open sap purchase page", () => {
    cy.visit("https://suncor.enable-now.cloud.sap/content/saml/saml_login.htm");
    cy.visit("https://sapq1r.network.qut/sap/bc/ui2/flp#Shell-home");
  });
});
