const express = require('express');
const router = express.Router();

const {
    listarAlunos,
    buscarAlunoPorId,
    criarAluno,
    atualizarAluno,
    atualizarAlunoParcialmente,
    removerAluno,
} = require('../controllers/alunoController');

router.get('/', listarAlunos);
router.get('/:id', buscarAlunoPorId);
router.post('/', criarAluno);
router.put('/:id', atualizarAluno);
router.patch('/:id', atualizarAlunoParcialmente);
router.delete('/:id', removerAluno);

module.exports = router;