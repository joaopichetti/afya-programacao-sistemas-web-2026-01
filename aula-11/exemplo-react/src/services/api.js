const API_BASE_URL = 'http://localhost:3000';

export async function obterAlunos(filtros = {}) {
    const parametros = new URLSearchParams();

    if (filtros.nome) {
        parametros.append('nome', filtros.nome);
    }

    if (filtros.ativo !== '') {
        parametros.append('ativo', filtros.ativo);
    }

    if (filtros.linguagem) {
        parametros.append('linguagem', filtros.linguagem);
    }

    const textoParametros = parametros.toString() ? `?${parametros.toString()}` : '';

    const url = `${API_BASE_URL}/alunos${textoParametros}`;

    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error('Falha ao buscar alunos');
    }

    return await resposta.json();
}

export async function criarAluno(aluno) {
    const url = `${API_BASE_URL}/alunos`;

    const resposta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno),
    });

    if (!resposta.ok) {
        throw new Error('Falha ao criar aluno');
    }

    return await resposta.json();
}

export async function atualizarAluno(id, aluno) {
    const url = `${API_BASE_URL}/alunos/${id}`;

    const resposta = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    });

    if (!resposta.ok) {
        throw new Error('Falha ao atualizar aluno');
    }

    return await resposta.json();
}

export async function atualizarStatusAluno(id, ativo) {
    const url = `${API_BASE_URL}/alunos/${id}`;

    const resposta = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ativo })
    });

    if (!resposta.ok) {
        throw new Error('Falha ao atualizar status do aluno');
    }

    return await resposta.json();
}

export async function excluirAluno(id) {
    const url = `${API_BASE_URL}/alunos/${id}`;

    const resposta = await fetch(url, {
        method: 'DELETE'
    });

    if (!resposta.ok) {
        throw new Error('Falha ao excluir o aluno');
    }
}