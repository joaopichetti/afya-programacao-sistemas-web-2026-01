const { Aluno } = require('./Aluno');

// Banco de dados em memória (simulação)
let alunos = [];
// Variável para controlar o ID autoincremento
let proximoId = 1;

class AlunoDAO {
    async buscarTodos(filtro = {}) {
        const { nome, ativo, linguagem } = filtro;

        const temFiltro = nome || linguagem || 
            (ativo !== undefined && ativo !== null);

        if (!temFiltro) {
            return alunos;
        }

        return alunos.filter(aluno => {
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
    }

    async buscarPorId(id) {
        return alunos.find(aluno => aluno.id === id) || null;
    }

    async criar(dados) {
        const { nome, idade, mensalidade, ativo, linguagens } = dados;
        const novoAluno = new Aluno(
            proximoId++,
            nome,
            idade,
            mensalidade,
            ativo,
            linguagens,
        );
        alunos.push(novoAluno);
        return novoAluno;
    }

    async atualizar(id, dados) {
        const index = alunos.findIndex(aluno => aluno.id === id);
        if (index < 0) {
            return null;
        }
        const { nome, idade, mensalidade, ativo, linguagens } = dados;
        const alunoAtualizado = new Aluno(
            id,
            nome,
            idade,
            mensalidade,
            ativo,
            linguagens,
        );
        alunos[index] = alunoAtualizado;
        return alunoAtualizado;
    }

    async atualizarParcialmente(id, dados) {
        const index = alunos.findIndex(aluno => aluno.id === id);
        if (index < 0) {
            return null;
        }
        const { nome, idade, mensalidade, ativo, linguagens } = dados;
        if (nome) alunos[index].nome = nome;
        if (idade) alunos[index].idade = idade;
        if (mensalidade) alunos[index].mensalidade = mensalidade;
        if (linguagens) alunos[index].linguagens = linguagens;
        if (ativo !== undefined) alunos[index].ativo = ativo;
        return alunos[index];
    }
    
    async remover(id) {
        const index = alunos.findIndex(aluno => aluno.id === id);
        if (index >= 0) {
            // Remove 1 elemento a partir do índice encontrado
            alunos.splice(index, 1);
        }
    }
}

module.exports = new AlunoDAO();