// start_server.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

//group test together

describe("TS 1 2  visibility check", function() {
    it('TS 1 Check contact visibility', function() {
    // Arrange - setup initial app state
    // - visit a web page
        cy.visit('http://localhost:3000/')   
    // - query for an element
    // Act - take an action
    // - interact with that element
    // Assertion - make an assertion
    // - make an assertion about the page content
    })
    it('TS 2 Check event visibility', function() {
        // Arrange - setup initial app state
        // - visit a web page
            cy.visit('http://localhost:3000/')   
        // - query for an element 
        // Act - take an action
        // - interact with that element
        // Assertion - make an assertion
        // - make an assertion about the page content
        })
})

describe("Test 3 4 Check if buttons are visible and clickable", function() {
    it('TS 3.1 4.1 check add contact clickable', function() {
    // Arrange - setup initial app state
    // - visit a web page
        cy.visit('http://localhost:3000/')
        cy.contains('Add Contact').should('be.visible')
    // - query for an element
        cy.contains('Add Contact').click()
    // Act - take an action
    // - interact with that element
    // Assertion - make an assertion
    // - make an assertion about the page content
        cy.url()
            .should('include','/addContact')
    })

    it('TS 3.2 4.2 check add event clickable', function() {
        // Arrange - setup initial app state
        // - visit a web page
            cy.visit('http://localhost:3000/')
            cy.contains('Add Event').should('be.visible')
        // - query for an element
            cy.contains('Add Event').click()
        // Act - take an action
        // - interact with that element
        // Assertion - make an assertion
        // - make an assertion about the page content
            cy.url()
                .should('include','/addEvent')
        })
})


