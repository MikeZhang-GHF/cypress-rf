describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/');
    cy.get('li').should('have.length', 6);
    // cy.visit('https://sapq1r.network.qut/sap/bc/ui2/flp?#Shell-home');
  })
})