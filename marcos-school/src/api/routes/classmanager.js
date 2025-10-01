const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.post('/enrollclass', async (req, res) => {
    let Datelogger
    try {
        const { nome_disciplina, id_minister, modalidade } = req.body
        Datelogger = req.requestTimestamp

        await pool.query(
            `INSERT INTO classes (
                discipline_name,
                minister_id,
                modality
            ) VALUES (?, ?, ?)`, [nome_disciplina, id_minister, modalidade]
        )

        return res.status(200).json({
            success: true,
            message: '[BACKEND] Turma criada com sucesso.',
            timestamp: `${Datelogger}`
        })

    } catch (err) {
        console.error('[BACKEND] Falha ao tentar criar turma, tente novamente mais tarde:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao criar turma.',
            timestamp: `${Datelogger}`
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

        return res.status(200).json({
            success: true,
            data: rows,
        })

    } catch (err) {
        console.error('[BACKEND] Falha na consulta', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha na consulta de classes.'
        })
    }
})

router.delete('/removeclass/:id_classe', async (req, res) => {
    let Datelogger
    try {
        const { id_classe } = req.params
        Datelogger = req.requestTimestamp

        await pool.query(
            `DELETE FROM classes
            WHERE id = ?`, [id_classe]
        )

        res.status(200).json({
            success: true,
            message: "[BACKEND] Usuário excluído com sucesso.",
            timestamp: `${Datelogger}`
        })

    } catch (err) {
        console.error('[ERROR] Falha na exclusão da classe:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao excluir classe.',
            timestamp: `${Datelogger}`
        })
    }
})

router.post('/togglestatus', async (req, res) => {
    let Datelogger
    try {
        const { class_id } = req.body
        const CurrentDate = req.Currentdate
        Datelogger = req.requestTimestamp

        await pool.query(
            `UPDATE classes
            SET class_status = IF(class_status = 'Ativa', 'Inativa', 'Ativa'),
                updated_at = ?
            WHERE id = ?`, [CurrentDate, class_id]
        )

    } catch (err) {
        console.error('[BACKEND] Falha na alteração de status:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao alterar o status da classe.',
            timestamp: `${Datelogger}`
        })
    }
})

router.post('/fetchinfoclass', async (req, res) => {
    try {
        const { class_id } = req.body

        if (class_id === 0) {
            const [rows] = await pool.query(
                `SELECT c.*, u.username as minister
                FROM classes c
                LEFT JOIN users u ON c.minister_id = u.id
                WHERE c.class_status = 'Ativa'
                ORDER BY c.created_at DESC`
            )
            return res.status(200).json(rows)
        } else {
            const [rows] = await pool.query(
                `SELECT c.*, u.username as minister
                FROM classes c
                LEFT JOIN users u ON c.minister_id = u.id
                WHERE c.id = ?`, [class_id]
            )
            return res.status(200).json(rows)
        }

    } catch (err) {
        console.error('[BACKEND] Falha na consulta de informações:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao consultar informações.'
        })
    }
})

router.post('/editclass/:id', async (req, res) => {
    let Datelogger
    try {
        const { id } = req.params
        const { changes } = req.body
        Datelogger = req.requestTimestamp
        const CurrentDate = req.requestCurrentdate

        await pool.query(
            `UPDATE classes
            SET discipline_name = ?,
            modality = ?,
            updated_at = ?
            WHERE id = ?`, [changes.discipline_name, changes.modality, CurrentDate, id]
        )

    } catch (err) {
        console.error('[BACKEND] Falha na alteração dos dados:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao tentar alterar os dados.',
            timestamp: `${Datelogger}`
        })
    }
})

module.exports = router