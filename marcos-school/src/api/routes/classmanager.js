const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.post('/classmanager', async (req, res) => {

    const { id_professor, nome_disciplina, modalidade, status_turma } = req.body

    try {
        console.log("[BACKEND] Informações coletadas pronta para tratamento de dados", req.body)

        res.status(201).json({
            success: true,
            message: '[BACKEND] Dados coletados.',
            data: {
                id_professor,
                nome_disciplina,
                modalidade,
                status_turma
            }
        })

    } catch (err) {
        console.error('[ERROR] Falha no login:', err)
        return res.status(500).json({
            success: false,
            error: 'Falha interna no servidor.'
        })
    }
})

module.exports = router