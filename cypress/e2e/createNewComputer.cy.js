describe('Add a new computer', () => {
  it('Verify that new computer was created successfully.', () => {
    const timestamp = new Date().getTime()
    const computerName = `A${timestamp}`
    cy.visit('https://computer-database.gatling.io/computers')
    cy.get('[id="add"]').click()
    cy.get('#name').click().type(computerName)
    cy.get('#introduced').click().type('1983-10-15')
    cy.get('#discontinued').click().type('2003-11-20')
    cy.get('select#company').select('Evans & Sutherland')
    cy.get('.primary').click()
    cy.get('#searchbox').click().type(computerName)
    cy.get('#searchsubmit').click()
    cy.get('tbody > :nth-child(1) > :nth-child(1)').contains(computerName).should('be.visible')
  })
})
