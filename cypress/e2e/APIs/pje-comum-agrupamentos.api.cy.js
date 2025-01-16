describe('Testes de requisição as APIs de agrupamentos do pje comum', () => {
    beforeEach('Deve fazer uma requisição POST para logar via API', () => {
      cy.loginViaApi('loginMagistrado');    //Mudar o tipo de usuário de acordo com os armazenados na pasta fixtures
    });

    it('Recupera informações do agrupador selecionado',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/'
        }).then((response)=>{
            //const idAgrupamento = response.body.idAgrupamentoProcessoTarefa
            expect(response.status).to.eq(200)
            console.log(response.body)
            console.log(response.body[7].idAgrupamentoProcessoTarefa)
        })
    })

    it('Recupera as Classes Judiciais do Painel de Processos de um Órgão Julgador',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/7/classesjudiciais', //estudar uma maneira de passar o idAgrupamento dinamicamente
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Classes Judiciais', response.body)
        })
    })

    it('Recupera as Etiquetas do Painel de Processos de um Órgão Julgador',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/7/etiquetas',
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Etiquetas', response.body)
        })
    })

    it('Recupera as fases dos processos do Painel de Processos de um órgão Julgador',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/7/fasesprocessuais',
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Fases Processuais', response.body)
        })
    })

    it('Recupera os nomes dos magistrados com processo concluso para do Painel de Processos de um órgão Julgador',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/7/nomesConclusoMagistrados',
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Magistrados: ', response.body)
        })
    })

    it('Recupera os Órgãos Julgadores de um determinado agrupamento',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/7/orgaojulgadores',
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Orgãos Julgadores: ', response.body)
        })
    })

    it('Recupera a quantidade de processos nos agrupadores de tarefas',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/9/pendencias',
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Pendências', response.body)
        })
    })

    it('Recupera os relatores dos processos com pendência de um determinado agrupamento',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/9/pendencias/relatores',
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            console.log(response.body)
        })
    })

    it('Recupera as Tarefas do Painel de Processos de um órgão Julgador',()=>{
        cy.request({
            method: 'GET',
            url: '/pje-comum-api/api/agrupamentotarefas/9/pendencias/tarefas',
            failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            console.log('Tarefas: ', response.body)
        })
    })
});