const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.get('/login/:email', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT
                id,
                email,
                password,
                status
            FROM users
            WHERE email = ?`, [req.params.email]
        )

        rows.length === 0 ? res.json({ success: false, rows }) : res.json({ success: true, rows })

    } catch (err) {
        console.error('[ERROR] Não foi possível fazer a consulta:', err)
        res.status(500).json({ error: 'Erro no servidor.' })
    }
})

module.exports = router