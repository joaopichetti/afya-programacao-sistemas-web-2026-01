CREATE TABLE IF NOT EXISTS alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INTEGER NOT NULL,
    mensalidade NUMERIC(10, 2),
    ativo BOOLEAN NOT NULL,
    linguagens TEXT[],
    data_de_cadastro TIMESTAMPTZ DEFAULT NOW()
);