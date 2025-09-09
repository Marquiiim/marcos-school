const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.post('/addstudentclass', async (req, res) => {
    try {
        const { minister_id, student_id, class_id } = req.body

        const [[{ status }]] = await pool.query(
            `SELECT status
            FROM students
            WHERE id = ?`, student_id
        )

        if (status === 'Ativo') {
            await pool.query(
                `INSERT INTO student_classes (minister_id ,student_id, class_id)
            VALUES (?, ?, ?)`, [minister_id, student_id, class_id]
            )
            res.status(200).json({
                success: true,
                message: "[OK] Usuário adicionado a turma"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "[BACKEND] Usuário inativo"
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

router.post('/fetchstudents', async (req, res) => {
    try {
        const { name_student, class_id, limit = 10 } = req.body

        if (name_student && name_student.trim() !== '') {
            const [rows] = await pool.query(
                `SELECT * FROM students 
                WHERE name LIKE ?`, [`%${name_student.trim()}%`]
            )
            res.status(200).json(rows)

        } else {
            const [existing] = await pool.query(
                `SELECT s.*
                FROM students s
                LEFT JOIN student_classes sc ON s.id = sc.student_id AND sc.class_id = ?
                WHERE sc.student_id IS NULL
                LIMIT ?`,
                [class_id, parseInt(limit)]
            )
            res.status(200).json(existing)
        }

    } catch (err) {
        console.error('[ERROR] Falha na consulta', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

router.post('/searchstudents', async (req, res) => {
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
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})


module.exports = router