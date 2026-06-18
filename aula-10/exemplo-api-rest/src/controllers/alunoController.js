const alunoDAO = require('../models/alunoDAO');
const { validarDadosAluno } = require('./alunoValidator');

async function listarAlunos(req, res) {
    try {
        const { nome, ativo, linguagem } = req.query;
        const alunos = await alunoDAO.buscarTodos({ nome, ativo, linguagem });
        res.json(alunos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar alunos." });
        console.error(erro);
    }
}

async function buscarAlunoPorId(req, res) {
    try {
        const id = Number(req.params.id);
        const aluno = await alunoDAO.buscarPorId(id);

        if (!aluno) {
            return res.status(404).json({ erro: "Aluno não encontrado." });
        }

        res.json(aluno);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar aluno." });
        console.error(erro);
    }
}

async function criarAluno(req, res) {
    try {
        const { nome, idade, mensalidade, ativo, linguagens } = req.body;

        const erros = validarDadosAluno(
            nome, idade, mensalidade, ativo, linguagens);
        if (erros.length) {
            return res.status(400).json({ erros });
        }

        const novoAluno = await alunoDAO.criar({ 
            nome, idade, mensalidade, ativo, linguagens
        });

        res.status(201).json(novoAluno);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao criar aluno." });
        console.error(erro);
    }
}

async function atualizarAluno(req, res) {
    try {
        const id = Number(req.params.id);
        const { nome, idade, mensalidade, ativo, linguagens } = req.body;

        const erros = validarDadosAluno(
                nome, idade, mensalidade, ativo, linguagens);
        if (erros.length) {
            return res.status(400).json({ erros });
        }

        const aluno = await alunoDAO.atualizar(id, {
            nome, idade, mensalidade, ativo, linguagens
        });
        if (!aluno) {
            return res.status(404).json({ erro: "Aluno não encontrado." });
        }

        res.json(aluno);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar aluno." });
        console.error(erro);
    }
}

async function atualizarAlunoParcialmente(req, res) {
    try {
        const id = Number(req.params.id);
        const { nome, idade, mensalidade, ativo, linguagens } = req.body;

        const erros = validarDadosAluno(
            nome, idade, mensalidade, ativo, linguagens, true
        );
        if (erros.length) {
            return res.status(400).json({ erros });
        }

        const aluno = await alunoDAO.atualizarParcialmente(id, {
            nome, idade, mensalidade, ativo, linguagens
        });
        if (!aluno) {
            return res.status(404).json({ erro: "Aluno não encontrado." });
        }

        res.json(aluno);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar aluno parcialmente." });
        console.error(erro);
    }
}

async function removerAluno(req, res) {
    try {
        const id = Number(req.params.id);
        await alunoDAO.remover(id);

        res.status(204).send();
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao remover aluno." });
        console.error(erro);
    }
}

module.exports = {
    listarAlunos,
    buscarAlunoPorId,
    criarAluno,
    atualizarAluno,
    atualizarAlunoParcialmente,
    removerAluno,
};