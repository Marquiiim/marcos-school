const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.post('/enrollclass', async (req, res) => {
    try {
        const { nome_disciplina, id_minister, modalidade } = req.body

        await pool.query(
            `INSERT INTO classes (
                discipline_name,
                minister_id,
                modality
            ) VALUES (?, ?, ?)`, [nome_disciplina, id_minister, modalidade]
        )

        res.status(200).json({
            success: true,
            message: '[BACKEND] Dados coletados e inseridos no banco.'
        })

    } catch (err) {
        console.error('[ERROR] Falha no login:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

router.post('/fetchclass', async (req, res) => {
    try {
        const { id_minister } = req.body

        const [rows] = await pool.query(
            `SELECT * FROM classes
            WHERE minister_id = ?`, [id_minister]
        )

        res.status(200).json({
            success: true,
            data: rows,
        })

    } catch (err) {
        console.error('[ERROR] Falha na consulta', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

router.delete('/removeclass/:id_classe', async (req, res) => {
    try {
        const { id_classe } = req.params

        await pool.query(
            `DELETE FROM classes
            WHERE id = ?`, [id_classe]
        )

        res.status(200).json({
            success: true,
            message: "[BACKEND] Usuário excluído com sucesso"
        })

    } catch (err) {
        console.error('[ERROR] Falha na exclusão:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

router.post('/togglestatus', async (req, res) => {
    try {
        const { class_id } = req.body

        await pool.query(
            `UPDATE classes
            SET class_status = IF(class_status = 'Ativa', 'Inativa', 'Ativa')
            WHERE id = ?`, [class_id]
        )

    } catch (err) {
        console.error('[ERROR] Falha na exclusão:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

module.exports = router