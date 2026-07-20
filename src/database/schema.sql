-- ==========================================================
-- BookStore Manager CLI - Script de criação do banco de dados
-- ==========================================================
-- Execute este script conectado ao banco "bookstore_manager"
-- (crie o banco antes, ex: CREATE DATABASE bookstore_manager;)
-- ==========================================================

DROP TABLE IF EXISTS emprestimos;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS autores;

-- ----------------------------------------------------------
-- Tabela: autores
-- ----------------------------------------------------------
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(100)
);

-- ----------------------------------------------------------
-- Tabela: livros
-- ----------------------------------------------------------
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor_id INTEGER NOT NULL,
    ano_publicacao INTEGER,
    quantidade_total INTEGER NOT NULL DEFAULT 1,
    quantidade_disponivel INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT fk_livros_autor
        FOREIGN KEY (autor_id) REFERENCES autores(id)
        ON DELETE RESTRICT
);

-- ----------------------------------------------------------
-- Tabela: clientes
-- ----------------------------------------------------------
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

-- ----------------------------------------------------------
-- Tabela: emprestimos
-- ----------------------------------------------------------
CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    data_emprestimo TIMESTAMP NOT NULL DEFAULT NOW(),
    data_devolucao TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'ativo', -- 'ativo' ou 'finalizado'
    CONSTRAINT fk_emprestimos_livro
        FOREIGN KEY (livro_id) REFERENCES livros(id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_emprestimos_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE RESTRICT
);

-- ----------------------------------------------------------
-- Índices auxiliares
-- ----------------------------------------------------------
CREATE INDEX idx_livros_autor_id ON livros(autor_id);
CREATE INDEX idx_emprestimos_livro_id ON emprestimos(livro_id);
CREATE INDEX idx_emprestimos_cliente_id ON emprestimos(cliente_id);

-- ----------------------------------------------------------
-- Dados de exemplo (opcional, facilita testes)
-- ----------------------------------------------------------
INSERT INTO autores (nome, nacionalidade) VALUES
('Machado de Assis', 'Brasileira'),
('J.K. Rowling', 'Britânica'),
('George Orwell', 'Britânica');

INSERT INTO livros (titulo, autor_id, ano_publicacao, quantidade_total, quantidade_disponivel) VALUES
('Dom Casmurro', 1, 1899, 3, 3),
('Harry Potter e a Pedra Filosofal', 2, 1997, 5, 5),
('1984', 3, 1949, 2, 2);

INSERT INTO clientes (nome, email, telefone) VALUES
('Ana Souza', 'ana.souza@email.com', '48999990001'),
('Bruno Lima', 'bruno.lima@email.com', '48999990002');
