// https://docs.cypress.io/api/introduction/api.html

describe('Landing', () => {
  it('Shows correct title text', () => {
    cy.visit('/')

    cy.contains('h1', 'Editor para escritores criativos.')
  })
})