const express = require('express')
const router = express.Router()
const pool = require('../bd/connectionBD')

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    try {
        const [rows] = await pool.query(
            `SELECT
                id,
                email,
                password,
                status
            FROM users
            WHERE email = ?`, [email]
        )

        const user = rows[0]

        if (user.length === 0) {
            res.status(401).json({
                success: false,
                message: 'O usuário não existe.'
            })
        }

        if (user.email !== email || user.password !== password) {
            res.status(401).json({
                success: false,
                message: 'Credenciais inválidas.'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Sucesso ao logar.'
            })
        }

    } catch (err) {
        console.error('[ERROR] Não foi possível fazer a consulta:', err)
        res.status(500).json({ error: 'Erro no servidor.' })
    }
})

module.exports = router