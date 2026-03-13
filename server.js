require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// conexão com banco
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})


// LISTAR EVENTOS
app.get('/api/eventos', async (req, res) => {
    try {

        const result = await pool.query(
            'SELECT * FROM eventos ORDER BY id'
        )

        res.json(result.rows)

    } catch (err) {

        console.error(err)
        res.status(500).json({ erro: 'Erro ao buscar eventos' })

    }
})


// CRIAR EVENTO
app.post('/api/eventos', async (req, res) => {

    const { nome, data_evento, local, descricao } = req.body

    try {

        await pool.query(
            'INSERT INTO eventos (nome, data_evento, local, descricao) VALUES ($1,$2,$3,$4)',
            [nome, data_evento, local, descricao]
        )

        res.json({ mensagem: 'Evento criado' })

    } catch (err) {

        console.error(err)
        res.status(500).json({ erro: 'Erro ao criar evento' })

    }

})


// ATUALIZAR EVENTO
app.put('/api/eventos/:id', async (req, res) => {

    const id = req.params.id
    const { nome, data_evento, local, descricao } = req.body

    try {

        await pool.query(
            'UPDATE eventos SET nome=$1, data_evento=$2, local=$3, descricao=$4 WHERE id=$5',
            [nome, data_evento, local, descricao, id]
        )

        res.json({ mensagem: 'Evento atualizado' })

    } catch (err) {

        console.error(err)
        res.status(500).json({ erro: 'Erro ao atualizar evento' })

    }

})


// DELETAR EVENTO
app.delete('/api/eventos/:id', async (req, res) => {

    const id = req.params.id

    try {

        await pool.query(
            'DELETE FROM eventos WHERE id=$1',
            [id]
        )

        res.json({ mensagem: 'Evento deletado' })

    } catch (err) {

        console.error(err)
        res.status(500).json({ erro: 'Erro ao deletar' })

    }

})


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})