// Importar Express
const express = require('express');
const cors = require('cors');

// Importar rotas
const alunoRoutes = require('./routes/alunoRoutes');

// Criar app Express
const app = express();
// Constante para a porta padrão
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// Rotas
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

app.use('/alunos', alunoRoutes);

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});