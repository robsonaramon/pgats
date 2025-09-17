const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');
const transferService = require('../../service/transferService');

describe('Transfer Controller', () => {
    describe('POST /transfer', () => {

        beforeEach(async () => {
            const respostaLogin = await request(app)
                .post('/login')
                .send({
                    username: 'Jones',
                    password: '123456'
                });
            token = respostaLogin.body.token;
        });


        it('Retornar o código 400 quando o remetente e destinatário são inexistentes', async () => {


            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    remetente: "Marcos",
                    destinatario: "Jones",
                    valor: 1000
                });
            
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

        });

        it('Usando Mocks: Retornar o código 400 quando o remetente e destinatário são inexistentes', async () => {
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    remetente: "Marcos",
                    destinatario: "Jones",
                    valor: 1000
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        });

        it('Usando Mocks: Retornar o código 201 quando os valores informados são válidos', async () => {
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                remetente: "Jones",
                destinatario: "Silva",
                valor: 100,
                data: new Date().toISOString()
            });

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    remetente: "Jones",
                    destinatario: "Silva",
                    valor: 100
                })

            expect(resposta.status).to.equal(201);

            const respostaEsperada = require('../fixture/respostas/retornarCodigo201QuandoOsValoresInformadosSaoValidos.json');
            delete resposta.body.data;
            delete respostaEsperada.data;
            expect(resposta.body).to.deep.equal(respostaEsperada);
        });

        afterEach(()=> {
            sinon.restore();
        });
    
    });
});