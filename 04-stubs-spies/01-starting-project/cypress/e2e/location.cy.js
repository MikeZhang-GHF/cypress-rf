/// <reference types="cypress" />

describe("share location", () => {
  beforeEach(() => {
    cy.clock();
    cy.fixture("user-location.json").as("userLocation");
    cy.visit("/").then((win) => {
      cy.get("@userLocation").then((fakePosition) => {
        cy.stub(win.navigator.geolocation, "getCurrentPosition")
          .as("getUserPosition")
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      });
      // stub function getCurrentPosition
      //
      cy.stub(win.navigator.clipboard, "writeText")
        .as("saveToClipboard")
        .resolves();
      cy.spy(win.localStorage, "setItem").as("storeLocation");
      cy.spy(win.localStorage, "getItem").as("getStoredLocation");
    });
  });
  it("passes", () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    // simulate to call the third party function
    cy.get("@getUserPosition").should("have.been.called");
    cy.get('[data-cy="get-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="actions"]').should("contain", "Location fetched");
  });

  it("should share a location URL", () => {
    const name = "Ice Breaker";
    cy.get('[data-cy="name-input"]').type("Ice Breaker");
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@saveToClipboard").should("have.been.called");
    cy.get("@userLocation").then((fakePosition) => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get("@saveToClipboard").should(
        "have.been.calledWithMatch",
        /Ice Breaker/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI("Ice Breaker")}`)
      );
      cy.get("@storeLocation").should(
        "have.been.calledWithMatch",
        /Ice Breaker/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI("Ice Breaker")}`)
      );
    });
    cy.get("@storeLocation").should("have.been.called");
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@getStoredLocation").should("have.been.called");
    cy.get('[data-cy="info-message"]').should("be.visible");
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should("not.be.visible");
  });
});
