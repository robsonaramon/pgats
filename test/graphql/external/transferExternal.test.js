const request = require('supertest');
const { expect, use } = require('chai');

const chaiExclude = require('chai-exclude');
const { transfer } = require('../../../service/transferService');
use(chaiExclude);
require('dotenv').config();

describe('Teste de transferência', () => {

    before(async () => {
        const login = require('../fixture/request/login/login.json');
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(login);

        token = resposta.body.data.login.token;
    })


    beforeEach(()=>{
        fixtransfer = require('../fixture/request/transfer/transfer.json');
    })

    it('Validar tranferência entre duas contas', async ()=> {
        const respostaEsperada = require('../fixture/response/transfer/validarTranferênciaEntreDuasContas.json')
        const respostaTransferencia = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(fixtransfer);

        expect(respostaTransferencia.status).to.equal(200);
        expect(respostaTransferencia.body.data.transfer).excluding('data').to.eql(respostaEsperada.data.transfer);
    });

    const testeDeErrosDeNegocio = require('../fixture/request/transfer/transferWithError.json')
    testeDeErrosDeNegocio.forEach(teste=> {
        it(`Validar a tranferência com ${teste.nomeTeste}`, async ()=> {
            const respostaTransferencia = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', `Bearer ${token}`)
                .send(teste.transfer);

            expect(respostaTransferencia.status).to.equal(200);
            expect(respostaTransferencia.body.errors[0].message).to.equal(teste.mensagemEsperada);
        });
    });
    
});