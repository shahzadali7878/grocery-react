describe('SubCategories', () => {
  it('Creates a subCategory', () => {
    cy.visit('http://localhost:3001');
    cy.createColor();
    cy.createSize();
    cy.createCategory();
    cy.createSubCategory();
    cy.navigateToProducts();

    cy.get('.New-Product').click();
    cy.contains('Create Product');

    cy.get('.Save-Product').click();
    cy.get('.alert-danger').contains('Name can\'t be blank');
    cy.get('.alert-danger').contains('Description can\'t be blank');
    cy.get('.alert-danger').contains('Price can\'t be blank');
    cy.get('.alert-danger').contains('Price is not a number');
    cy.get('.alert-danger').contains('Description is too short (minimum is 5 characters)');

    cy.get('textarea[name="description"]').type('This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters.This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters. This is a very long description exceeding 250 characters.');
    cy.get('.Save-Product').click();
    cy.get('.alert-danger').contains('Description is too long (maximum is 250 characters)');

    cy.get('input[name="name"]').type('iPhone 14');
    cy.get('textarea[name="description"]').clear();
    cy.get('textarea[name="description"]').type('Brand new iPhone 14!');
    cy.get('input[name="price"]').type(10000);
    cy.get('input[name="discounted-price"]').type(9000);
    cy.get('#on-sale-yes').click();
    cy.get('.Field-Color').first().click();
    cy.get('.Field-Size').first().click();
    cy.get('.Save-Product').click();

    cy.get('.alert-success').contains('Product is saved successfully!');
  });

  it('Edits a product', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToProducts();

    cy.get('.Edit-Product').first().click();
    cy.contains('Edit Product');

    cy.get('input[name="name"]').type('!');
    cy.get('.Save-Product').click();
    cy.get('.alert-success').contains("Product is saved successfully!");
  });

  it('Deletes a product', () => {
    cy.visit('http://localhost:3001');
    cy.navigateToProducts();

    cy.get('.List-Products tbody').find('tr').then(($value) => length = $value.length);

    cy.get('.btn-danger').first().click();
    cy.get('button').contains('Yes').click();
    cy.get('.List-Products tbody tr').should(($tr) => (expect($tr).to.have.length(length - 1)));
  });
});
