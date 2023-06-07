/// <reference types="Cypress" />

describe("task management", () => {
  it.skip("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
    // test cancel
    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it.skip("should create a new task", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    const taskTitle = "New Task";
    const taskDescription = "Some description";
    cy.get("#title").type(taskTitle);
    cy.get("#summary").type(taskDescription);
    cy.get(".modal").contains("Add Task").click();
    // assert modal should close
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
    // Assert task created and added
    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains(taskTitle);
    cy.get(".task p").contains("Some description");
  });

  it.skip("should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.contains("Please provide values");
  });

  it.skip("should filter tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    cy.get("#category").select("urgent"); // select urgent from droplist
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 0);
    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("all");
    cy.get(".task").should("have.length", 1);
  });

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get('#title').type('Task 1');
    cy.get('#summary').type('First task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);

    cy.contains("Add Task").click();
    cy.get('#title').type('Task 2');
    cy.get('#summary').type('Second task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 2);
    // assert task item
    cy.get('.task').eq(0).contains('First task');
    cy.get('.task').eq(1).contains('Second task');
  });
});
