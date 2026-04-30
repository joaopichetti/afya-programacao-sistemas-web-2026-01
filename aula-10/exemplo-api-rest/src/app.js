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