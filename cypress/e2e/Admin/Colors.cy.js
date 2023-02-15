describe('Colors', () => {
  it('Creates a color', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToColors();

    cy.get('.New-Color').click();
    cy.contains('Create Color');

    cy.get('.Save-Color').click();
    cy.get('.alert-danger').contains('Name can\'t be blank');
    cy.get('.alert-danger').contains('Code can\'t be blank');

    cy.get('input[name="code"]').type('#ZZZZZZ');
    cy.get('.Save-Color').click();
    cy.get('.alert-danger').contains('Code is invalid');

    cy.get('input[name="name"]').type('Black');
    cy.get('input[name="code"]').clear();
    cy.get('input[name="code"]').type('#000000');
    cy.get('.Save-Color').click();
    cy.get('.alert-success').contains('Color is saved successfully!');
  });

  it('Edits a color', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToColors();

    cy.get('.Edit-Color').first().click();
    cy.contains('Edit Color');

    cy.get('input[name="name"]').type('!');
    cy.get('.Save-Color').click();
    cy.get('.alert-success').contains('Color is saved successfully!');
  });

  it('Deletes a color', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToColors();

    cy.get('.List-Colors tbody').find('tr').then(($value) => length = $value.length);

    cy.get('.btn-danger').first().click();
    cy.get('button').contains('Yes').click();
    cy.get('.List-Colors tbody tr').should(($tr) => (expect($tr).to.have.length(length - 1)));
  });
});
