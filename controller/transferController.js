// transferController.js
const transferService = require('../service/transferService');

const transfer = (req, res) => {
  const { remetente, destinatario, valor } = req.body;
  try {
    const result = transferService.transfer({ remetente, destinatario, valor });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const list = (req, res) => {
  res.json(transferService.listTransfers());
};

module.exports = {
  transfer,
  list
};
