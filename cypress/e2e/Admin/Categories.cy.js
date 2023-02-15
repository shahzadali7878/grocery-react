describe('Categories', () => {
  it('Creates a category', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToCategories();

    cy.get('.New-Category').click();
    cy.contains('Create Category');

    cy.get('.Save-Category').click();
    cy.get('.alert-danger').contains('Name can\'t be blank');
    cy.get('.alert-danger').contains('Description can\'t be blank');
    cy.get('.alert-danger').contains('Description is too short (minimum is 5 characters)');

    cy.get('textarea[name="description"]').type('This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters.This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters.');
    cy.get('.Save-Category').click();
    cy.get('.alert-danger').contains('Description is too long (maximum is 250 characters)');

    cy.get('input[name="name"]').type('Mobiles');
    cy.get('textarea[name="description"]').clear();
    cy.get('textarea[name="description"]').type('Get quality mobiles!');
    cy.get('.Save-Category').click();
    cy.get('.alert-success').contains('Category is saved successfully!');
  });

  it('Edits a category', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToCategories();

    cy.get('.Edit-Category').first().click();
    cy.contains('Edit Category');

    cy.get('input[name="name"]').type('!');
    cy.get('.Save-Category').click();
    cy.get('.alert-success').contains("Category is saved successfully!");
  });

  it('Deletes a category', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToCategories();

    cy.get('.List-Categories tbody').find('tr').then(($value) => length = $value.length);

    cy.get('.btn-danger').first().click();
    cy.get('button').contains('Yes').click();
    cy.get('.List-Categories tbody tr').should(($tr) => (expect($tr).to.have.length(length - 1)));
  });
});
