describe('Product Listing Page', () => {
    it('should load products from API and display them', () => {
      cy.visit('/');  // visit the homepage
  
      // Verify that products are displayed
      cy.get('.product-item').should('have.length.greaterThan', 0); // Replace `.product-item` with your actual class for product display
      cy.get('.product-item').first().should('contain.text', 'Add to Cart');
    });
  });
  