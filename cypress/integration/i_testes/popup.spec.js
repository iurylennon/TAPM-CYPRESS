/// <reference types="cypress" />

describe('Work with Popup', () => {

    it('Deve testar popup diretamente', () => {
        cy.visit('https://www.wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click() 
        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Click OK!')
        })
       
    }) 

    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    }) 

    describe('With links...', () => {
        beforeEach(() => {
            cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        })

        it('Check popup url', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('eq', 'https://www.wcaquino.me/cypress/frame.html')
        })

        it('Should acccess popup dinamincally', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
        })

        it('Sould force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target') //invoca o atributo target e remove ele para que possa ser trabalhado na mesma página
                .click()
            cy.get('#tfield').type('funciona')
        })
    })
})

