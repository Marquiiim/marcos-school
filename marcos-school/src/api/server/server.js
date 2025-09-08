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

app.listen(5000, () => {
    console.log('[Sucesso] Servidor rodando na porta 5000')
})