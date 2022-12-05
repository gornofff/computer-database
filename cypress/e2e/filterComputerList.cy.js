describe('Filter computer list', () => {
  it('Filter computer list by “HP”, create a map of the returned data and print the map', () => {
    const map = []
    cy.visit('https://computer-database.gatling.io/computers')
    cy.get('#searchbox').type('HP')
    cy.get('#searchsubmit').click()
    cy.get('tbody')
      .find('td')
      .each(($el, $index) => {
        cy.wrap($el)
          .invoke('text')
          .then(text => {
            if ($index>=0) {
              map.push(text.trim())
            }
          })
      })
      .then(() => expect(map).to.deep.eq([
        'CrunchPad', '-', '-', '-',
        'HP 2133 Mini-Note PC', '15 Apr 2008', '-', 'Hewlett-Packard',
        'HP 9000', '-', '-', '-',
        'HP Integrity', '-', '-', '-',
        'HP MediaSmart Server', '-', '-', '-',
        'HP Mini 1000', '29 Oct 2008', '-', 'Hewlett-Packard',
        'HP Superdome', '-', '-', '-',
        'HP TouchPad', '09 Feb 2011', '-', 'Hewlett-Packard',
        'HP Veer', '09 Feb 2011', '-', 'Hewlett-Packard',
        'HP nPar', '-', '-', '-'
      ]))
    cy.log(map)
  })

  it('Filter computer list by “IBM”, return a list of computer names on the LAST page of the results and print the list of computer names', () => {
    const listComputerName = []
    cy.visit('https://computer-database.gatling.io/computers')
    cy.get('#searchbox').type('IBM')
    cy.get('#searchsubmit').click()
    cy.get('[href="/computers?p=1&n=10&s=name&d=asc&f=IBM"]').click()
    cy.get('[href="/computers?p=2&n=10&s=name&d=asc&f=IBM"]').click()
    cy.get('tbody')
      .find('td')
      .each(($el, $index) => {
        cy.wrap($el)
          .invoke('text')
          .then(text => {
            if ($index%4===0) {
              listComputerName.push(text.trim())
            }
          })
      })
      .then(() => expect(listComputerName).to.deep.eq([
        'IBM System p',
        'IBM System x',
        'IBM System z',
        'IBM System/4 Pi',
        'IBM TC-1'
        ]))
    cy.log(listComputerName)
  })
})

