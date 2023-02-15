describe('Landing Page', () => {
  it('Basic navigation', () => {
    cy.visit('http://localhost:3001')

    cy.get('.Site-Title').contains('Grocery')
    cy.get('.Site-Link').contains('Admin Dashboard')

    cy.get('.Site-Link > a').click()

    cy.get('.Menu-Item').contains('Categories')
    cy.get('.Menu-Item').contains('Colors')
    cy.get('.Menu-Item').contains('Sizes')
  })
})
