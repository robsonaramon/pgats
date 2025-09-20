const request = require('supertest');
const { expect, use } = require('chai');

const chaiExclude = require('chai-exclude');
use(chaiExclude);

const url = 'http://localhost:4000/graphql'

describe('Teste de transferência', () => {

    before(async () => {
        const login = require('../fixture/request/login/login.json');
        const resposta = await request(url)
            .post('')
            .send(login);

        token = resposta.body.data.login.token;
    })


    beforeEach(()=>{
        transfer = require('../fixture/request/transfer/transfer.json');
    })

    it('Validar tranferência entre duas contas', async ()=> {
        const respostaEsperada = require('../fixture/response/transfer/validarTranferênciaEntreDuasContas.json')
        const respostaTransferencia = await request(url)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(transfer);

        expect(respostaTransferencia.status).to.equal(200);
        expect(respostaTransferencia.body.data.transfer).excluding('data').to.eql(respostaEsperada.data.transfer);
    });

    it('Validar que não é possível tranferir de uma conta com saldo insuficiente', async ()=> {
        transfer.variables.input.valor = 10000;

        const respostaTransferencia = await request(url)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(transfer);

        expect(respostaTransferencia.status).to.equal(200);
        expect(respostaTransferencia.body.errors[0].message).to.equal('Saldo insuficiente');
    });

    
});