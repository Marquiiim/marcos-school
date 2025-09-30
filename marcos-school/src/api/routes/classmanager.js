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

        if (id_minister === 0) {
            const [rows] = await pool.query(
                `SELECT * FROM classes`
            )

            return res.status(200).json({
                success: true,
                data: rows,
            })
        } else {
            const [rows] = await pool.query(
                `SELECT * FROM classes
            WHERE minister_id = ?`, [id_minister]
            )

            return res.status(200).json({
                success: true,
                data: rows,
            })
        }


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
        const dataAtual = new Date()

        await pool.query(
            `UPDATE classes
            SET class_status = IF(class_status = 'Ativa', 'Inativa', 'Ativa'),
                updated_at = ?
            WHERE id = ?`, [dataAtual, class_id]
        )

    } catch (err) {
        console.error('[ERROR] Falha na exclusão:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
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
        console.error('[ERROR] Falha na exclusão:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

router.post('/editclass/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { changes } = req.body
        const dataAtual = new Date()

        await pool.query(
            `UPDATE classes
            SET discipline_name = ?,
            modality = ?,
            updated_at = ?
            WHERE id = ?`, [changes.discipline_name, changes.modality, dataAtual, id]
        )

    } catch (err) {
        console.error('[ERROR] Falha na alteração dos dados:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

module.exports = router