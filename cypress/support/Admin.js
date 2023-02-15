Cypress.Commands.add('navigateToColors', () => {
  cy.get('.Site-Link > a').click();
  cy.get('.Menu-Item').contains('Colors').click();
});

Cypress.Commands.add('createColor', () => {
  cy.navigateToColors();
  cy.get('.New-Color').click();

  cy.get('input[name="name"]').type('Black');
  cy.get('input[name="code"]').type('#000000');
  cy.get('.Save-Color').click();
});

Cypress.Commands.add('navigateToSizes', () => {
  cy.get('.Site-Link > a').click();
  cy.get('.Menu-Item').contains('Sizes').click();
});

Cypress.Commands.add('createSize', () => {
  cy.navigateToSizes();
  cy.get('.New-Size').click();

  cy.get('input[name="name"]').type('Small');
  cy.get('input[name="code"]').type('s');
  cy.get('.Save-Size').click();
});

Cypress.Commands.add('navigateToCategories', () => {
  cy.get('.Site-Link > a').click();
  cy.get('.Menu-Item').contains('Categories').click();
});

Cypress.Commands.add('createCategory', () => {
  cy.navigateToCategories();
  cy.get('.New-Category').click();

  cy.get('input[name="name"]').type('Mobiles');
  cy.get('textarea[name="description"]').type('Get quality mobiles!');

  cy.get('.Save-Category').click();
});

Cypress.Commands.add('navigateToSubCategories', () => {
  cy.navigateToCategories();
  cy.get('.Link-SubCategories').first().click();
});

Cypress.Commands.add('createSubCategory', () => {
  cy.navigateToSubCategories();
  cy.get('.New-SubCategory').click();

  cy.get('input[name="name"]').type('Apple');
  cy.get('textarea[name="description"]').type('Get quality Apple mobiles!');

  cy.get('.Save-SubCategory').click();
});

Cypress.Commands.add('navigateToProducts', () => {
  cy.navigateToSubCategories();
  cy.get('.Link-Products').first().click();
});
