// start_server.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

//group test together



describe("Test 5 Check if buttons are visible and clickable", function() {
    it('TS 5.1 Check for correct input prompts for add contact botton (name, phone number, etc)', function() {
        cy.visit('http://localhost:3000/addContact')
        cy.contains("Enter the contact's details below").should('be.visible')
        cy.contains('First Name:').should('be.visible')
        cy.contains('Last Name:').should('be.visible')
        cy.contains('Email:').should('be.visible')
        cy.contains('Phone:').should('be.visible')
        cy.contains('Comments:').should('be.visible')
    
    })

    it('TS 7 check add contact clickable&  visivle', function() {
        cy.visit('http://localhost:3000/addContact')
            cy.pause()
            cy.contains('Add Contact').should('be.visible')
            cy.contains('Add Contact').click()
        })
})


