// start_server.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

//group test together
describe("Simple test", function() {
    //first sub test
    it('does not do much', function() {
        expect(true).to.equal(true)
    })
})

describe("Sample test", function() {
    it('sample sub test', function() {
    // Arrange - setup initial app state
    // Act - take an action
    // Assertion - make an assertion
    })
})

describe("TS 1 2 3 visibility check", function() {
    it('TS 1 Check client visibility', function() {
    // Arrange - setup initial app state
    // - visit a web page
        cy.visit('http://localhost:3000/')
        cy.pause()
    // - query for an element
        cy.contains('Add Contact').should('be.visible')
        

    // Act - take an action
    // - interact with that element
    // Assertion - make an assertion
    // - make an assertion about the page content
    })
})

describe("Test 4 Check if buttons are clickable", function() {
    it('TS 4.1 check add contact clickable', function() {
    // Arrange - setup initial app state
    // - visit a web page
        cy.visit('http://localhost:3000/')
        cy.pause()
    // - query for an element
    cy.contains('Add Contact').click()
    // Act - take an action
    // - interact with that element
    // Assertion - make an assertion
    // - make an assertion about the page content
    
        cy.url()
            .should('include','/addContact')
    })
})


