describe('SubCategories', () => {
  it('Creates a subCategory', () => {
    cy.visit('http://localhost:3001');
    cy.createCategory();
    cy.navigateToSubCategories();

    cy.get('.New-SubCategory').click();
    cy.contains('Create SubCategory');

    cy.get('.Save-SubCategory').click();
    cy.get('.alert-danger').contains('Name can\'t be blank');
    cy.get('.alert-danger').contains('Description can\'t be blank');
    cy.get('.alert-danger').contains('Description is too short (minimum is 5 characters)');

    cy.get('textarea[name="description"]').type('This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters.This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters.');
    cy.get('.Save-SubCategory').click();
    cy.get('.alert-danger').contains('Description is too long (maximum is 250 characters)');

    cy.get('input[name="name"]').type('Apple');
    cy.get('textarea[name="description"]').clear();
    cy.get('textarea[name="description"]').type('Get quality Apple mobiles!');
    cy.get('.Save-SubCategory').click();
    cy.get('.alert-success').contains('SubCategory is saved successfully!');
  });

  it('Edits a subCategory', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToSubCategories();

    cy.get('.Edit-SubCategory').first().click();
    cy.contains('Edit SubCategory');

    cy.get('input[name="name"]').type('!');
    cy.get('.Save-SubCategory').click();
    cy.get('.alert-success').contains("SubCategory is saved successfully!");
  });

  it('Deletes a category', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToSubCategories();

    cy.get('.List-SubCategories tbody').find('tr').then(($value) => length = $value.length);

    cy.get('.btn-danger').first().click();
    cy.get('button').contains('Yes').click();
    cy.get('.List-SubCategories tbody tr').should(($tr) => (expect($tr).to.have.length(length - 1)));
  });
});
