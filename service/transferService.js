// transferService.js
const { transfers } = require('../model/transferModel');
const { findUserByUsername } = require('./userService');

function transfer({ remetente, destinatario, valor }) {
  if (!remetente || !destinatario || typeof valor !== 'number') {
    throw new Error('Dados de transferência inválidos');
  }
  const userFrom = findUserByUsername(remetente);
  const userTo = findUserByUsername(destinatario);
  if (!userFrom || !userTo) throw new Error('Usuário não encontrado');
  if (userFrom.saldo < valor) throw new Error('Saldo insuficiente');
  const isFavorecido = userFrom.favorecidos.includes(destinatario);
  if (!isFavorecido && valor >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só para favorecidos');
  }
  userFrom.saldo -= valor;
  userTo.saldo += valor;
  const transfer = { remetente, destinatario, valor, data: new Date() };
  transfers.push(transfer);
  return transfer;
}

function listTransfers() {
  return transfers;
}

module.exports = {
  transfer,
  listTransfers
};
