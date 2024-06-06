/// <reference types="cypress"/>

describe("Teste de API - Produtos", () => {
	let token

	beforeEach(() => {
		cy.token("sorvetilho@gmail.com", "teste").then((tkn) => {
			token = tkn
		})
	})

	it("Deve listar produtos com sucesso - GET", () => {
		cy.request({
			method: "GET",
			url: "produtos",
		}).should((response) => {
			expect(response.status).equal(200)
			expect(response.body).to.have.property("produtos")
		})
	})

	it("Deve cadastrar um produto com sucesso - POST", () => {
		let produto = "Produto EBAC " + Math.floor(Math.random() * 10000000000)
		cy.cadastrarProduto(token, produto, 25, produto, 150).should((response) => {
			expect(response.status).equal(201)
			expect(response.body.message).equal("Cadastro realizado com sucesso")
		})
	})

	it("Deve validar mensagem de produto cadastrado anteriormente - POST", () => {
		cy.cadastrarProduto(
			token,
			"Cabo USB 1",
			10,
			"Cabo USB do tipo C",
			150,
		).should((response) => {
			expect(response.status).equal(400)
			expect(response.body.message).equal("Já existe produto com esse nome")
		})
	})

	it("Deve editar um produto com sucesso - PUT", () => {
		let produto =
			"Produto EBAC editado " + Math.floor(Math.random() * 10000000000)
		cy.cadastrarProduto(token, produto, 25, "Produto EBAC editado", 150).then(
			(response) => {
				let id = response.body._id
				cy.request({
					method: "PUT",
					url: `produtos/${id}`,
					headers: { authorization: token },
					body: {
						nome: produto,
						preco: 150,
						descricao: "EBAC",
						quantidade: 51,
					},
				}).should((response) => {
					expect(response.body.message).to.equal(
						"Registro alterado com sucesso",
					)
					expect(response.status).to.equal(200)
				})
			},
		)
	})

	it("Deve deletar um produto com sucesso - DELETE", () => {
		cy.cadastrarProduto(
			token,
			"Produto EBAC a ser deletado",
			100,
			"Delete",
			50,
		).then((response) => {
			let id = response.body._id
			cy.request({
				method: "DELETE",
				url: `produtos/${id}`,
				headers: { authorization: token },
			}).should((resp) => {
				expect(resp.body.message).to.equal("Registro excluído com sucesso")
				expect(resp.status).to.equal(200)
			})
		})
	})
})
