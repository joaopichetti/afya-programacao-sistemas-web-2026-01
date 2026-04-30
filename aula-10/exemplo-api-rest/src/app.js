// Importar Express
const express = require('express');

// Criar app Express
const app = express();
// Constante para a porta padrão
const PORT = 3000;

// Middlewares
app.use(express.json());

// Rotas (Endpoints)
app.get('/', (req, res) => {
    const paginaHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>Página de Teste</title></head>
        <body style="background-color: #333; color: white; font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>Olá, Turma de ADS!</h1>
            <p>O servidor não serve apenas JSON, ele também pode renderizar páginas inteiras!</p>
        </body>
        </html>
    `;
    res.send(paginaHtml);
});

// 1. GET: Retorna todos os alunos
app.get('/alunos', (req, res) => {
    const { nome, ativo, linguagem } = req.query;
    if (nome || linguagem || ativo) {
        const alunosFiltrados = alunos.filter(aluno => {
            if (nome && typeof nome === 'string' 
                && !aluno.nome.toLowerCase().includes(nome.toLowerCase())) {
                return false;
            }
            if (ativo && typeof ativo === 'string'
                && String(aluno.ativo).toLowerCase() !== ativo.toLowerCase()) {
                return false;
            }
            if (linguagem && typeof linguagem === 'string'
                && (!aluno.linguagens
                    || !aluno.linguagens.length
                    || !aluno.linguagens.find(
                        elemento => elemento.toLowerCase().includes(
                            linguagem.toLowerCase())))) {
                return false;
            }
            return true;
        });
        return res.json(alunosFiltrados);
    }
    res.json(alunos);
});

// 2. GET: (por ID): Retorna um aluno específico
app.get('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const aluno = alunos.find(aluno => aluno.id === id);

    if (!aluno) {
        // 404 Not Found
        return res.status(404).json({ erro: "Aluno não encontrado." });
    }

    res.json(aluno);
});

// 3. POST: Cria um novo aluno
app.post('/alunos', (req, res) => {
    const { nome, idade, mensalidade, ativo, linguagens } = req.body;

    // Validação básica (400 Bad Request)
    if (!nome || !idade || ativo === undefined) {
        return res.status(400).json({
            erro: "Nome, idade, e ativo são campos obrigatórios"
        });
    }

    const novoAluno = new Aluno(
        proximoId++,
        nome,
        idade,
        mensalidade,
        ativo,
        linguagens,
    );

    alunos.push(novoAluno);

    // 201 Created
    res.status(201).json(novoAluno);
});

// 4. PUT: Substitui integralmente um aluno
app.put('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = alunos.findIndex(aluno => aluno.id === id);

    if (index < 0) {
        // 404 Not Found
        return res.status(404).json({ erro: "Aluno não encontrado"});
    }

    const { nome, idade, mensalidade, ativo, linguagens } = req.body;
    // Validação básica (400 Bad Request)
    if (!nome || !idade || ativo === undefined) {
        return res.status(400).json({
            erro: "Nome, idade, e ativo são campos obrigatórios"
        });
    }

    // Substitui todo o objeto, mantendo o ID
    Object.assign(alunos[index], {
        nome, idade, mensalidade, ativo, linguagens
    });

    res.status(200).json(alunos[index]);
});

// 5. PATCH: Atualiza parcialmente um aluno
app.patch('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = alunos.findIndex(aluno => aluno.id === id);

    if (index < 0) {
        // 404 Not Found
        return res.status(404).json({ erro: "Aluno não encontrado." });
    }

    const { nome, idade, mensalidade, ativo, linguagens } = req.body;
    if (!nome && !idade && !mensalidade && !linguagens && ativo === undefined) {
        // 400 Bad Request
        return res.status(400).json({ 
            erro: "Informe algum campo para atualizar"
        });
    }

    if (nome) alunos[index].nome = nome;
    if (idade) alunos[index].idade = idade;
    if (mensalidade) alunos[index].mensalidade = mensalidade;
    if (linguagens) alunos[index].linguagens = linguagens;
    if (ativo !== undefined) alunos[index].ativo = ativo;

    res.status(200).json(alunos[index]);
});

// 6. DELETE: Remove um aluno
app.delete('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = alunos.findIndex(aluno => aluno.id === id);

    if (index > 0) {
        // Remove 1 elemento a partir do índice encontrado
        alunos.splice(index, 1);
    }

    // 204 No Content
    res.status(204).send();
});

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

// Modelo (Classe Aluno)
class Aluno {
    constructor(id, nome, idade, mensalidade, ativo, linguagens) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.mensalidade = mensalidade;
        this.ativo = ativo;
        this.linguagens = linguagens;
        this.dataDeCadastro = new Date().toISOString();
    }
}

// Banco de dados em memória (simulação)
let alunos = [];
// Variável para controlar o ID autoincremento
let proximoId = 1;