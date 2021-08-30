/// <reference types="Cypress" />

describe(
    'Criando entidades',
    () => {

        beforeEach(() => {
            cy.visit('http://localhost:3000/#/')
        })

        it(
            'Deve cadastrar time',
            () => {
                cy.visit('http://localhost:3000/#/criar-time')
                cy.get('[id=nome')
                    .type('TesteTime')

                cy.get('[id=tecnico]')
                    .type('Tite')

                cy.get('[id=torcida]')
                    .type('134')

                cy.get('[id=test_btnsalvar]')
                    .click()
                cy.visit('http://localhost:3000/#/')
                cy.get('[id=test_tabela]')
                    .should('contain.text', 'TesteTime')
            })

    })