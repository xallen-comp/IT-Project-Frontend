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

describe("Test 6 Check if buttons are visible and clickable", function() {
    it('TS 6.1 Check for correct input prompts for add event botton (title,description,start etc)', function() {
        cy.visit('http://localhost:3000/addEvent')
        cy.contains("New Event").should('be.visible')

        //cy.contains('Enter Title').should('be.visible')
        cy.get('input[name = "title"]').invoke('attr', 'placeholder').should('contain', 'Enter Title')
        //cy.contains('Enter Description').should('be.visible')
        cy.get('textarea').invoke('attr', 'placeholder').should('contain', 'Enter Description')

        //cy.contains('Start:').should('be.visible')
        cy.get('input[name = "Start"]').invoke('attr', 'type').should('eq', 'datetime-local')
        //cy.contains('End:').should('be.visible')
        cy.get('input[name = "End"]').invoke('attr', 'type').should('eq', 'datetime-local')
    
    })

    it('TS 8 check add event clickable&  visivle', function() {
        cy.visit('http://localhost:3000/addEvent')
            cy.contains('Add Event').should('be.visible')
            cy.contains('Add Event').click()
        })
})


