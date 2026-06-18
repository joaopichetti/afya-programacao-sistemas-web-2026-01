import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export async function obterAlunos(filtros = {}) {
    const parametros = {};

    if (filtros.nome) {
        parametros.nome = filtros.nome;
    }

    if (filtros.ativo !== '') {
        parametros.ativo = filtros.ativo;
    }

    if (filtros.linguagem) {
        parametros.linguagem = filtros.linguagem;
    }

    const resposta = await api.get('/alunos', { params: parametros });
    return await resposta.data;
}

export async function criarAluno(aluno) {
    const resposta = await api.post('/alunos', aluno);
    return await resposta.data;
}

export async function atualizarAluno(id, aluno) {
    const resposta = await api.put(`/alunos/${id}`, aluno);
    return resposta.data;
}

export async function atualizarStatusAluno(id, ativo) {
    const resposta = await api.patch(`/alunos/${id}`, { ativo });
    return resposta.data;
}

export async function excluirAluno(id) {
    await api.delete(`/alunos/${id}`);
}

export async function obterAluno(id) {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
}