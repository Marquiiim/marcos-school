const mysql2 = require('mysql2/promise')

const pool = mysql2.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'marcosschool'
})

module.exports = pool