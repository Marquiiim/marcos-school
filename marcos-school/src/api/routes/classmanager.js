const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.post('/classmanager', async (req, res) => {

    const { nome_disciplina, id_professor, modalidade, status_turma } = req.body

    try {
        const [rows] = await pool.query(
            `INSERT INTO classes (
                nome_disciplina,
                id_professor,
                modalidade,
                status_turma
            ) VALUES (?, ?, ?, ?)`, [nome_disciplina, id_professor, modalidade, status_turma]
        )

        res.status(200).json({
            success: true,
            message: '[BACKEND] Dados coletados e inseridos no banco.'
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