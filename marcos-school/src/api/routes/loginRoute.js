const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {
        const [rows] = await pool.query(
            `SELECT
                id,
                status,
                username,
                email,
                password,
                last_login
            FROM users
            WHERE email = ?`, [email]
        )

        const user = rows[0]

        if (!rows || rows.length === 0) {
            res.status(401).json({
                success: false,
                message: 'O usuário não existe.'
            })
        }

        if (user.password !== password) {
            res.status(401).json({
                success: false,
                message: 'Credenciais inválidas.'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Sucesso ao logar.',
                user: {
                    id: user.id,
                    username: user.username,
                    status: user.status,
                    ultimo_login: user.last_login
                }
            })
        }

    } catch (err) {
        console.error('[ERROR] Falha no login:', err)
        return res.status(500).json({
            success: false,
            error: 'Falha interna no servidor.'
        })
    }
})

module.exports = router