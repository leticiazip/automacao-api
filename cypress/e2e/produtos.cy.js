/// <reference types="cypress"/>

describe('Teste de API - Produtos', () => {
    it('Listar produtos - GET', () => {
      cy.request({
        method: 'GET',
        url: 'produtos'
      }).should((response) => {
        expect(response.status).equal(200)
        expect(response.body).to.have.property('produtos')
      })
    })

    it.only('Cadastrar produto - POST', () => {
        //TODO: Criar token dinamicamente
        let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvcnZldGlsaG9AZ21haWwuY29tIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTcxNzIyNTk5NCwiZXhwIjoxNzE3MjI2NTk0fQ.rq3YuixgVRVe_DPjXCkthWdVqb20vK8msSqLywzXXq0"
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body: {
                //TODO: Criar produto dinamicamente
                "nome": "Cabo USB 1",
                "preco": 15,
                "descricao": "Cabo USB do tipo C",
                "quantidade": 450
            }
        }).should((response => {
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        }))
    })
  })