// userModel.js
// Banco de dados em memória
const bcrypt = require('bcryptjs');


const users = [
    {
        username: 'Jones',
        password: bcrypt.hashSync('123456', 8),
        favorecidos: ["Silva"],
        saldo: 10000
    },
    {
        username: 'Silva',
        password: bcrypt.hashSync('123456', 8),
        favorecidos: ["Jones"],
        saldo: 10000
    }
];

module.exports = {
    users
};