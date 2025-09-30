const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.post('/addstudentclass', async (req, res) => {
    try {
        const { minister_id, student_id, class_id } = req.body

        const [[{ status }]] = await pool.query(
            `SELECT status
            FROM students
            WHERE student_id = ?`, student_id
        )

        if (status === 'Ativo') {
            await pool.query(
                `INSERT INTO student_classes (minister_id ,student_id, class_id)
            VALUES (?, ?, ?)`, [minister_id, student_id, class_id]
            )
            return res.status(200).json({
                success: true,
                message: "[OK] Usuário adicionado a turma"
            })
        } else {
            return res.status(400).json({
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

router.post('/removestudentclass', async (req, res) => {
    try {
        const { student_id } = req.body

        await pool.query(
            `DELETE FROM student_classes
            WHERE student_id = ?`, [student_id]
        )

        res.status(200).json({
            success: true,
            message: "[BACKEND] Aluno removido com sucesso"
        })

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
            return res.status(200).json(rows)

        } else {
            const [existing] = await pool.query(
                `SELECT s.*
                FROM students s
                LEFT JOIN student_classes sc ON s.student_id = sc.student_id AND sc.class_id = ?
                WHERE sc.student_id IS NULL
                LIMIT ?`,
                [class_id, parseInt(limit)]
            )
            return res.status(200).json(existing)
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
        const { name_student, class_id, filter } = req.body
        const searchName = name_student ? `%${name_student.trim()}%` : `%`

        if (filter === true) {
            const [rows] = await pool.query(
                `SELECT s.*, sc.*
                    FROM students s
                    INNER JOIN student_classes sc ON s.student_id = sc.student_id 
                    WHERE s.name LIKE ?
                    AND sc.class_id = ?`, [searchName, class_id]
            )
            return res.status(200).json(rows)
        } else {
            const [rows] = await pool.query(
                `SELECT s.*
                FROM students s
                WHERE s.name LIKE ?
                AND s.student_id NOT IN (
                    SELECT student_id
                    FROM student_classes
                    WHERE class_id = ?
                )`, [searchName, class_id]
            )
            return res.status(200).json(rows)
        }
    } catch (err) {
        console.error('[ERROR] Falha na consulta', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

router.post('/studentsinclass', async (req, res) => {
    try {
        const { class_id } = req.body

        const [rows] = await pool.query(
            `SELECT s.*
            FROM students s
            INNER JOIN student_classes sc ON s.student_id = sc.student_id
            WHERE sc.class_id = ?`, [class_id]
        )
        res.status(200).json(rows)
    } catch (err) {
        console.error('[ERROR] Falha na consulta:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha interna no servidor.'
        })
    }
})

module.exports = router