CREATE DATABASE servicos;

\c servicos;

-- Criar tabela eventos
CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_evento DATE NOT NULL,
    local VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL
);

-- Inserir eventos
INSERT INTO eventos (nome, data_evento, local, descricao)
VALUES
('Festa', '2026-03-27', 'Festa da faculdade', 'Evento de confraternização'),
('Show', '2026-12-30', 'Festa da virada', 'Show de ano novo');

-- Criar tabela de usuários (login)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(10) DEFAULT 'usuario'
);

-- Inserir usuários de teste
INSERT INTO usuarios (nome, email, senha, tipo)
VALUES
('Administrador', 'admin@email.com', '123456', 'admin'),
('Usuario', 'user@email.com', '123456', 'usuario');