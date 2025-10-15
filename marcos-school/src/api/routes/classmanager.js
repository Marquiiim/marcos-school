const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')
const { data } = require('react-router-dom')

router.post('/enrollclass', async (req, res) => {
    let Datelogger = new Date().toLocaleString('pt-BR')

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
            timestamp: Datelogger
        })

    } catch (err) {
        console.error('[BACKEND] Falha ao tentar criar turma, tente novamente mais tarde:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao criar turma.',
            timestamp: Datelogger
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
    let Datelogger = new Date().toLocaleString('pt-BR')

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
            timestamp: Datelogger
        })

    } catch (err) {
        console.error('[ERROR] Falha na exclusão da classe:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao excluir classe.',
            timestamp: Datelogger
        })
    }
})

router.post('/togglestatus', async (req, res) => {
    let Datelogger = new Date().toLocaleString('pt-BR')

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
            timestamp: Datelogger
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
    let Datelogger = new Date().toLocaleString('pt-BR')

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
            timestamp: Datelogger
        })
    }
})

router.post('/frequency', async (req, res) => {
    const currentDate = new Date()
    let Datelogger = currentDate.toLocaleString('pt-BR')

    try {
        const { student_id, class_id, present, arrival_time, notes } = req.body

        const daysMap = {
            1: 'Segunda-feira',
            2: 'Terça-feira',
            3: 'Quarta-feira',
            4: 'Quinta-feira',
            5: 'Sexta-feira'
        }

        const getWeekStart = (date = new Date()) => {
            const d = new Date(date)
            const day = d.getDay()
            const diff = d.getDate() - day + (day === 0 ? -6 : 1)
            return new Date(d.setDate(diff)).toISOString().split('T')[0]
        }

        const getCurrentDay = () => {
            return daysMap[new Date().getDay()]
        }

        const updateSummary = (attendanceData) => {
            const week = attendanceData.week
            let daysPresent = 0
            let daysAbsent = 0

            Object.values(week).forEach(day => {
                if (day.present === true) daysPresent++
                if (day.present === false) daysAbsent++
            })

            attendanceData.summary = {
                total_days: 5,
                days_present: daysPresent,
                days_absent: daysAbsent,
                days_pending: 5 - daysPresent - daysAbsent
            }
            return attendanceData
        }

        const weekStart = getWeekStart()
        const currentDay = getCurrentDay()

        const [existingRecords] = await pool.query(
            `SELECT id, attendance_data from attendance
            WHERE student_id = ? 
            AND class_id = ? 
            AND week_start = ?`, [student_id, class_id, weekStart]
        )

        let attendanceData

        if (existingRecords.length > 0) {
            attendanceData = JSON.parse(existingRecords[0].attendance_data)

            if (attendanceData.week[currentDay]) {
                attendanceData.week[currentDay] = {
                    ...attendanceData.week[currentDay],
                    present: present,
                    arrival_time: arrival_time,
                    notes: notes || ""
                }
            }

            attendanceData.last_update = currentDate.toISOString().split('T')[0]
            attendanceData = updateSummary(attendanceData)

            await pool.query(
                `UPDATE attendance
                SET attendance_data = ?, created_at = now()
                WHERE student_id = ? 
                AND class_id = ? 
                AND week_start = ?`, [JSON.stringify(attendanceData), student_id, class_id, weekStart]
            )

            return res.status(200).json({
                success: true,
                message: '[BACKEND] Frequência registrada com sucesso.',
                timestamp: Datelogger
            })

        } else {
            const week = {}
            const start = new Date(weekStart)

            for (let i = 0; i < 5; i++) {
                const date = new Date(start)
                date.setDate(start.getDate() + i)
                const dayName = daysMap[i + 1]

                week[dayName] = {
                    date: date.toISOString().split('T')[0],
                    present: null,
                    arrival_time: null,
                    notes: ""
                }
            }

            week[currentDay] = {
                date: new Date().toISOString().split('T')[0],
                present: present,
                arrival_time: arrival_time,
                notes: notes || ""
            }

            attendanceData = {
                week: week,
                last_update: new Date().toISOString().split('T')[0],
                summary: {}
            }

            attendanceData = updateSummary(attendanceData)

            await pool.query(
                `INSERT INTO attendance (
            student_id,
            class_id,
            week_start,
            attendance_data
            ) VALUES (?, ?, ?, ?)`, [student_id, class_id, weekStart, JSON.stringify(attendanceData)]
            )
        }

        res.status(200).json({
            success: true,
            message: '[BACKEND] Frequência registrada com sucesso.',
            timestamp: Datelogger
        })

    } catch (err) {
        console.error('[BACKEND] Falha na alteração dos dados:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao tentar alterar os dados.',
            timestamp: Datelogger
        })
    }
})

router.post('/getfrequency', async (req, res) => {
    let Datelogger = new Date().toLocaleString('pt-BR')

    try {
        const { currentDay } = req.body

        const [rows] = await pool.query(
            `SELECT j.present
            FROM attendance,
            JSON_TABLE(
                JSON_KEYS(attendance_data->'$.week'),
                '$[*]' COLUMNS (
                    week_key VARCHAR(50) PATH '$'
                )
            ) AS week_keys
            CROSS JOIN JSON_TABLE(
                attendance_data,
                CONCAT('$.week.', week_key, '.', ?) COLUMNS (
                    present BOOLEAN PATH '$.present'
                )
            ) AS j
            WHERE j.present IS NOT NULL`, [currentDay]
        )

        res.status(200).json({
            success: true,
            data: rows,
            timestamp: Datelogger
        })

    } catch (err) {
        console.error('[BACKEND] Falha na alteração dos dados:', err)
        return res.status(500).json({
            success: false,
            error: '[BACKEND] Falha ao tentar alterar os dados.',
            timestamp: Datelogger
        })
    }
})

module.exports = router