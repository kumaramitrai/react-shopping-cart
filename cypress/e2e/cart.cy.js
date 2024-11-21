/// <reference types="cypress" />

describe("Cart Page", () => {
    beforeEach(() => {
      // Set initial cart items in localStorage
      cy.visit("/cart"); // Navigate to the cart page
      cy.window().then((win) => {
        win.localStorage.setItem(
          "cart",
          JSON.stringify([
            {
              product: {
                id: 1,
                title: "Sample Product 1",
                price: 100,
                image: "https://via.placeholder.com/150",
              },
              quantity: 2,
            },
            {
              product: {
                id: 2,
                title: "Sample Product 2",
                price: 200,
                image: "https://via.placeholder.com/150",
              },
              quantity: 1,
            },
          ])
        );
      });
      cy.reload(); // Reload to apply the localStorage cart
    });
  
    it("Should display cart items", () => {
      cy.get(".cart-items").should("have.length", 2); // Check number of cart items
      cy.contains("Sample Product 1").should("exist");
      cy.contains("Sample Product 2").should("exist");
    });
  
    it("Should increase item quantity", () => {
      cy.contains("Sample Product 1")
        .parent()
        .find("button")
        .contains("+")
        .click(); // Click the increase quantity button
  
      cy.contains("Sample Product 1")
        .parent()
        .contains("Quantity: 3"); // Verify the updated quantity
  
      cy.contains("Sample Product 1")
        .parent()
        .contains("Subtotal: 300"); // Verify the updated subtotal
    });
  
    it("Should decrease item quantity", () => {
      cy.contains("Sample Product 1")
        .parent()
        .find("button")
        .contains("-")
        .click(); // Click the decrease quantity button
  
      cy.contains("Sample Product 1")
        .parent()
        .contains("Quantity: 1"); // Verify the updated quantity
  
      cy.contains("Sample Product 1")
        .parent()
        .contains("Subtotal: 100"); // Verify the updated subtotal
    });
  
    it("Should delete an item", () => {
      cy.contains("Sample Product 1")
        .parent()
        .find("button")
        .contains("Delete")
        .click(); // Click the delete button
  
      cy.get(".cart-items").should("have.length", 1); // Verify one item remains
      cy.contains("Sample Product 1").should("not.exist"); // Verify the item is removed
    });
  
    it("Should display the correct total price", () => {
      cy.get(".total").contains("Total: 400"); // Verify the total price
    });
  
    it("Should clear the cart", () => {
      cy.get(".total").find("button").contains("Clear Cart").click(); // Click the clear cart button
      cy.contains("Your cart is empty").should("exist"); // Verify the cart is empty
      cy.get(".cart-items").should("not.exist"); // Verify no items are displayed
    });
  });
  