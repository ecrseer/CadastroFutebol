const Carro = require('../../../src/js/carro')
const Calculadora = require('../../../src/js/calculadora')

describe(
    'Calculo do valor gasto na viagem',
    () => {

        const autonomiaPorLitro = 10
        let carro
        let calculadora

        beforeEach(() => {
            carro = new Carro(autonomiaPorLitro)
            calculadora = new Calculadora()
        })

        it('Deve retornar 60 para a distancia de 100km.',
        () => {
            // Arrange
            const distancia = 100
            const valorCombustivelPorLitro = 6
            let consumoTotal
            let valorGastoNaViagem

            // Act
            consumoTotal = calculadora.consumoTotal(distancia, carro.autonomiaPorLitro)
            valorGastoNaViagem = 
                carro.valorGastoViagem(
                    consumoTotal,
                    valorCombustivelPorLitro
                )

            // Assert
            expect(valorGastoNaViagem).to.eq(60)
        })

    }
)