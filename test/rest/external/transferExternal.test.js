const request = require('supertest');
const {expect,use} = require('chai');

const app = require('../../../app');
const chaiExclude = require('chai-exclude');
use(chaiExclude)

require('dotenv').config();

describe('Transfer Controller', ()=> {
    describe('POST /transfer', ()=> {

        before(async () => {
            const postLogin = require('../fixture/request/login/postLogin.json')
            const respostaLogin = await request(app)
                .post('/login')
                .send(postLogin);
            token = respostaLogin.body.token;
        });

        it("Retornar o código 201 quando os valores informados são válidos", async() => {
            const postTransfer = require('../fixture/request/transfer/postTransfer.json')
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send(postTransfer)

            expect(resposta.status).to.equal(201);

            const respostaEsperada = require('../fixture/response/retornarCodigo201QuandoOsValoresInformadosSaoValidos.json');
            expect(resposta.body).excluding('data').to.deep.equal(respostaEsperada);

        })


        const testeDeErrosDeNegocio = require('../fixture/request/transfer/postTransferWithErrors.json');
        testeDeErrosDeNegocio.forEach(teste=>{
            it(`Retornar o código ${teste.nomeTeste}`, async ()=> {
                const postTransfer = require('../fixture/request/transfer/postTransfer.json');
                
                const resposta = await request(process.env.BASE_URL_REST)
                    .post('/transfer')
                    .set('Authorization', `Bearer ${token}`)
                    .send(teste.postTransfer);
                
                expect(resposta.status).to.equal(teste.statusCode);
                expect(resposta.body).to.have.property('error', teste.mensagemEsperada);
            });
        });

    });
});
