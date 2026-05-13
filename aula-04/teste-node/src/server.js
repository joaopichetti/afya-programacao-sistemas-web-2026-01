const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'Bem-vindo a minha primeira aplicação Node!',
    detalhe: "Teste de resposta JSON",
    timestamp: new Date(),
    ambiente: process.env.NODE_ENV
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});