const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

// ROTAS PARA TURMAS

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
            error: 'Falha interna no servidor.'
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
            count: rows.length
        })

    } catch (err) {
        console.error('[ERROR] Falha na consulta', err)
        return res.status(500).json({
            success: false,
            error: 'Falha interna no servidor.'
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
            message: "Usuário excluído com sucesso"
        })

    } catch (err) {
        console.error('[ERROR] Falha na exclusão:', err)
        return res.status(500).json({
            success: false,
            error: 'Falha interna no servidor.'
        })
    }
})

// ROTAS PARA ESTUDANTES

router.post('/addstudentclass', async (req, res) => {
    try {
        const { minister_id, id_student, id_classe } = req.body

        await pool.query(
            `INSERT INTO student_classes (minister_id ,student_id, class_id)
            VALUES (?, ?, ?)`, [minister_id, id_student, id_classe]
        )

        res.status(200).json({
            success: true,
            message: "Usuário adicionado a turma"
        })

    } catch (err) {
        console.error('[ERROR] Falha na consulta', err)
        return res.status(500).json({
            success: false,
            error: 'Falha interna no servidor.'
        })
    }
})

router.post('/fetchstudents', async (req, res) => {
    try {
        const { name_student, limit = 10 } = req.body

        if (name_student && name_student.trim() !== '') {
            const [rows] = await pool.query(
                `SELECT * FROM students 
                WHERE name LIKE ?`, [`%${name_student.trim()}%`]
            )
            res.status(200).json(rows)

        } else {
            const [rows] = await pool.query(
                `SELECT * FROM students 
                LIMIT ?`, [parseInt(limit)]
            )
            res.status(200).json(rows)
        }

    } catch (err) {
        console.error('[ERROR] Falha na consulta', err)
        return res.status(500).json({
            success: false,
            error: 'Falha interna no servidor.'
        })
    }
})


module.exports = router