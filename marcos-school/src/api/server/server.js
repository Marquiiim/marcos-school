const express = require('express')
const cors = require('cors')

const loginRoute = require('../routes/loginRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', loginRoute)

app.listen(5000, () => {
    console.log('[Sucesso] Servidor rodando na porta 5000')
})