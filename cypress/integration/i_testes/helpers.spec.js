/// <reference types="cypress" />

describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade:20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
       // cy.get('#formNome').then($el => {
       //     //$el.val('funciona via jquery')
       //     cy.wrap($el).type('funciona via cypress')
       //})
        
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500) 
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        //promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
   
    })

    it('Its...', () => {
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.eq', 'User')

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos' } }
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contains', 'bobos')
        cy.wrap(obj2).its('endereco.rua').should('contains', 'bobos')


        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.eq', 20)
    })

    it.only('Invoke', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue }).invoke('fn').should('be.eq', 1)
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.eq', 7)

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via Invoke')
        cy.window().invoke('alert', 'Da pra ver?')
        cy.get('#resultado')
            .invoke('html', '<input type="button", value="hack ed!"/>')

    })

    
})