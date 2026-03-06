const db = require('../database/database');


// LISTAR TODOS OS EVENTOS
exports.listarEventos = (req, res) => {
  db.query("SELECT * FROM eventos", (err, results) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json(results);
  });
};


// BUSCAR EVENTO POR ID
exports.buscarEvento = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM eventos WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensagem: "Evento não encontrado" });
    }

    res.json(results[0]);
  });
};


// CRIAR EVENTO
exports.criarEvento = (req, res) => {
  const { nome, data_evento, local, descricao } = req.body;

  db.query(
    "INSERT INTO eventos (nome, data_evento, local, descricao) VALUES (?, ?, ?, ?)",
    [nome, data_evento, local, descricao],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      res.status(201).json({
        mensagem: "Evento criado com sucesso!",
        id: result.insertId
      });
    }
  );
};


// ATUALIZAR EVENTO
exports.atualizarEvento = (req, res) => {
  const id = req.params.id;
  const { nome, data_evento, local, descricao } = req.body;

  db.query(
    "UPDATE eventos SET nome = ?, data_evento = ?, local = ?, descricao = ? WHERE id = ?",
    [nome, data_evento, local, descricao, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensagem: "Evento não encontrado" });
      }

      res.json({ mensagem: "Evento atualizado com sucesso!" });
    }
  );
};


// DELETAR EVENTO
exports.deletarEvento = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM eventos WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensagem: "Evento não encontrado" });
      }

      res.json({ mensagem: "Evento deletado com sucesso!" });
    }
  );
};