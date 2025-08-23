const request = require('supertest');
const {expect} = require('chai');

const app = require('../../app');
const transferService = require('../../service/transferService');

describe('Transfer Controller', ()=> {
    describe('POST /transfer', ()=> {
        it ('Retornar o código 400 quando o remetente e destinatário são inexistentes', async ()=> {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .send({
                    remetente: "Marcos",
                    destinatario: "Jones",
                    valor: 1000
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error','Usuário não encontrado')
        });
    });
});
