const express = require('express')
const cors = require('cors')

const loginRoute = require('../routes/loginRoute')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', loginRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`[Sucesso] Servidor rodando na porta ${PORT}`)
})