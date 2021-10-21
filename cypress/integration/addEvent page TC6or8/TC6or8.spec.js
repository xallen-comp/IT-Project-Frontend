// start_server.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

//group test together



describe("Test 6 Check if buttons are visible and clickable", function() {
    it('TS 6.1 Check for correct input prompts for add event botton (title,description,start etc)', function() {
        cy.visit('http://localhost:3000/addEvent')
        cy.contains("Enter the event's details below").should('be.visible')
        cy.contains('Title:').should('be.visible')
        cy.contains('Description:').should('be.visible')
        cy.contains('Start:').should('be.visible')
        cy.contains('End:').should('be.visible')
    
    })

    it('TS 8 check add event clickable&  visivle', function() {
        cy.visit('http://localhost:3000/addEvent')
            cy.pause()
            cy.contains('Add Event').should('be.visible')
            cy.contains('Add Event').click()
        })
})


