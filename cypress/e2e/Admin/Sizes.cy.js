describe('Sizes', () => {
  it('Creates a size', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToSizes();

    cy.get('.New-Size').click();
    cy.contains('Create Size');

    cy.get('.Save-Size').click();
    cy.get('.alert-danger').contains('Name can\'t be blank');
    cy.get('.alert-danger').contains('Code can\'t be blank');

    cy.get('input[name="name"]').type('Small');
    cy.get('input[name="code"]').type('s');
    cy.get('.Save-Size').click();
    cy.get('.alert-success').contains('Size is saved successfully!');
  });

  it('Edits a size', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToSizes();

    cy.get('.Edit-Size').first().click();
    cy.contains('Edit Size');

    cy.get('input[name="name"]').type('!');
    cy.get('.Save-Size').click();
    cy.get('.alert-success').contains('Size is saved successfully!');
  });

  it('Deletes a size', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToSizes();

    cy.get('.List-Sizes tbody').find('tr').then(($value) => length = $value.length);

    cy.get('.btn-danger').first().click();
    cy.get('button').contains('Yes').click();
    cy.get('.List-Sizes tbody tr').should(($tr) => (expect($tr).to.have.length(length - 1)));
  });
});
