// start_server.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

//group test together

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe("Test 5 Check if buttons are visible and clickable", function() {
    it('TS 5.1 Check for correct input prompts for add contact botton (name, phone number, etc)', function() {
        cy.visit('http://localhost:3000/addContact')
        cy.contains("Enter the contact's details below").should('be.visible')

        //cy.contains('Enter FirstName').should('be.visible')
        cy.get('input[name = "firstName"]').invoke('attr', 'placeholder').should('contain', 'Enter FirstName')
        
        //cy.contains('Enter Last Name').should('be.visible')
        cy.get('input[name = "lastName"]').invoke('attr', 'placeholder').should('contain', 'Enter LastName')

        //cy.contains('Enter Email').should('be.visible')
        cy.get('input[name = "email"]').invoke('attr', 'placeholder').should('contain', 'Enter Email')

        //cy.contains('Enter Phone').should('be.visible')
        cy.get('input[name = "phone"]').invoke('attr', 'placeholder').should('contain', 'Enter Phone')

        //cy.contains('Enter occu').should('be.visible')
        cy.get('input[name = "occupation"]').invoke('attr', 'placeholder').should('contain', 'Enter Occupation')

        //cy.contains('Comments:').should('be.visible')
    
    })

    it('TS 7 check add contact clickable&  visivle', function() {
        cy.visit('http://localhost:3000/addContact')
        cy.contains('Add Contact').should('be.visible')
        cy.contains('Add Contact').click()
        })
})


