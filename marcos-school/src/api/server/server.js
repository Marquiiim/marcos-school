const express = require('express')
const cors = require('cors')

const authcontroller = require('../routes/authcontroller')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', authcontroller)

app.listen(5000, () => {
    console.log('[Sucesso] Servidor rodando na porta 5000')
})