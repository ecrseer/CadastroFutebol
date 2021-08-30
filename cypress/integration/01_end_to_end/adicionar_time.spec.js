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
            }),
            it(
                'Deve cadastrar jogador',
                () => {
                    cy.visit('http://localhost:3000/#/criar-jogador')
                    cy.get('[id=nome')
                        .type('TesteJogador')
    
                    cy.get('[id=salario]')
                        .type('12345')
                    cy.get('[id=camisa]')
                    .type('11')
    
                    cy.get('[id=posicao]')
                        .type('Atacante')
    
                    cy.get('[id=test_btnsalvar]')
                        .click()
                    cy.visit('http://localhost:3000/#/lista-jogadores')
                    cy.get('[id=test_tabela]')
                        .should('contain.text', 'TesteJogador')
                })

    })