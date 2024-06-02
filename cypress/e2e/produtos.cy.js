/// <reference types="cypress"/>

describe('Teste de API - Produtos', () => {

  let token

  beforeEach(() => {
    cy.token('sorvetilho@gmail.com', 'teste').then(tkn => {
      token = tkn
    })
  })

    it('Listar produtos - GET', () => {
      cy.request({
        method: 'GET',
        url: 'produtos'
      }).should((response) => {
        expect(response.status).equal(200)
        expect(response.body).to.have.property('produtos')
      })
    })

    it('Cadastrar produto - POST', () => {
      let produto = 'Produto EBAC ' + Math.floor(Math.random() * 10000000000)
      cy.cadastrarProduto(token, produto, 25, produto, 150).should((response => {
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        }))
    })

    it('Deve validar mensagem de produto cadastrado anteriormente', () => {
      cy.cadastrarProduto(token, 'Cabo USB 1', 10, 'Cabo USB do tipo C', 150).should((response => {
      expect(response.status).equal(400)
      expect(response.body.message).equal('Já existe produto com esse nome')
    }))
  })
})