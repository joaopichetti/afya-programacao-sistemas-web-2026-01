// Importar Express
const express = require('express');

// Criar app Express
const app = express();
// Constante para a porta padrão
const PORT = 3000;

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

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});