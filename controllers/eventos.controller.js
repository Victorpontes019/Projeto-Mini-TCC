const pool = require('../database/database');

exports.listarEventos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eventos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.buscarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM eventos WHERE id = $1',
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.criarEvento = async (req, res) => {
  const { nome, data_evento, local, descricao } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO eventos (nome, data_evento, local, descricao)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [nome, data_evento, local, descricao]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.atualizarEvento = async (req, res) => {
  const { id } = req.params;
  const { nome, data_evento, local, descricao } = req.body;

  try {
    const result = await pool.query(
      `UPDATE eventos 
       SET nome=$1, data_evento=$2, local=$3, descricao=$4
       WHERE id=$5 RETURNING *`,
      [nome, data_evento, local, descricao, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.deletarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM eventos WHERE id=$1', [id]);
    res.json({ mensagem: 'Evento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};