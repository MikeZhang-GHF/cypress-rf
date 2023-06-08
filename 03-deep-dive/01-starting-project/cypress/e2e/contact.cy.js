/// <reference types="Cypress" />

describe("contact form", () => {
  before(() => {});
  beforeEach(() => {
    cy.visit("/about");
  });
  afterEach(() => {});
  after(() => {});
  it("should submit form", () => {
    const message = "Cypress is awesome";
    const name = "Mike";
    const email = "mike@example.com{enter}"; // key {enter} under type command

    // out of browser code, e.g. nodeJS code
    cy.task("seedDatabase", "filename.csv").then((returnValue) => {
      // .. use returnValue
    });
    cy.getById("contact-input-message").type(message);
    cy.getById("contact-input-name").type(name);
    // assert send message button
    cy.getById("contact-btn-submit").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    // cy.screenshot();
    cy.getById("contact-input-email").type(email);
    cy.submitForm();
    cy.getById("contact-btn-submit").as("submitButton");
    cy.get("@submitButton").contains("Send Message");
    cy.get("@submitButton").click();
    cy.get("@submitButton").contains("Sending...");
    cy.get("@submitButton").should("have.attr", "disabled");
  });

  it.skip("should validate the form input", () => {
    cy.submitForm();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.eq("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-input-message"]').focus().blur();
    // cy.get('[data-cy="contact-input-message"]')
    //   .parent()
    //   .then((el) => {
    //     expect(el.attr("class")).to.contains("invalid");
    //   });

    // take screenshot
    // cy.screenshot();
    // best pratice is to use should
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    // use should in another way
    // cy.get('[data-cy="contact-input-message"]')
    //   .parent()
    //   .should((el) => {
    //     expect(el.attr("class")).not.to.be.undefined;
    //     expect(el.attr("class")).contains("invalid");
    //   });
  });
});
