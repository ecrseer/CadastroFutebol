/// <reference types="Cypress" />


// Distância percorrida
// km_inicial
// km_final
// distancia = km_final - km_inicial

// Interface
// input km_inicial
// input km_final
// botão calcular
// texto para o resultado

// Velocidade média
// dislocamento = km_final - km_inicial
// tempo decorrido = hora
// deslocamento / tempo decorrido

describe(
    'Calculadora de Consumo de Combustível',
    () => {
        
        // Antes de cada teste, acessa a home da aplicação
        beforeEach(() => {
            cy.visit('http://localhost:4000/#/criar-time')
        })

        it(
            'Deve cadastrar time',
            () => {
                
                
                cy.get('[id=nome')
                    .type('TesteTime')

                cy.get('[id=tecnico]')
                    .type('Tite')

                cy.get('[id=torcida]')
                    .type('134')

                cy.get('[id=test_btnsalvar]')
                    .click()

                cy.get('[id=test_tabela]')
                .should('have.text','TesteTime')

            })

    })