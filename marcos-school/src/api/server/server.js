const express = require('express')
const cors = require('cors')

const AuthControl = require('../routes/authcontrol')
const ClassManager = require('../routes/classmanager')
const StudentService = require('../routes/studentservice')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', AuthControl)
app.use('/api', ClassManager)
app.use('/api', StudentService)

app.use((req, res, next) => {
    req.requestTimestamp = new Date().toLocaleString('pt-BR')
    req.requestCurrentdate = new Date()
    next()
})

app.listen(5000, () => {
    console.log('[Sucesso] Servidor rodando na porta 5000')
})