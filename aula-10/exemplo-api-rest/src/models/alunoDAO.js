const pool = require('../database/db');

class AlunoDAO {

    // Retorna todos os alunos, com suporte a filtros opcionais por query string.
    async buscarTodos(filtros = {}) {
        const { nome, ativo, linguagem } = filtros;
        const condicoes = [];
        const valores = [];
        let contador = 1;

        if (nome) {
            condicoes.push(`nome ILIKE '%' || $${contador++} || '%'`);
            valores.push(nome);
        }
        if (ativo !== undefined && ativo !== null) {
            condicoes.push(`ativo = $${contador++}`);
            valores.push(ativo === 'true');
        }
        if (linguagem) {
            condicoes.push(`EXISTS (SELECT 1 FROM unnest(linguagens) AS l WHERE l ILIKE '%' || $${contador++} || '%')`);
            valores.push(linguagem);
        }

        const where = condicoes.length ? `WHERE ${condicoes.join(' AND ')}` : '';
        const query = `
            SELECT id, nome, idade, mensalidade, ativo, linguagens, data_de_cadastro AS "dataDeCadastro"
            FROM alunos
            ${where}
            ORDER BY id
        `;

        console.info(`Consulta SQL final: ${query}`);
        console.info(`Valores: ${valores}`);

        const resultado = await pool.query(query, valores);
        return resultado.rows;
    }

    // Retorna um aluno pelo ID, ou null se não encontrado.
    async buscarPorId(id) {
        const query = `
            SELECT id, nome, idade, mensalidade, ativo, linguagens, data_de_cadastro AS "dataDeCadastro"
            FROM alunos
            WHERE id = $1
        `;

        const resultado = await pool.query(query, [id]);
        return resultado.rows[0] || null;
    }

    // Cria um novo aluno e o salva no banco de dados.
    async criar(dados) {
        const { nome, idade, mensalidade, ativo, linguagens } = dados;
        const query = `
            INSERT INTO alunos (nome, idade, mensalidade, ativo, linguagens)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nome, idade, mensalidade, ativo, linguagens, data_de_cadastro AS "dataDeCadastro"
        `;

        const resultado = await pool.query(query, [nome, idade, mensalidade, ativo, linguagens]);
        return resultado.rows[0];
    }

    // Substitui todos os campos de um aluno (exceto o ID). Retorna null se não encontrado.
    async atualizar(id, dados) {
        const { nome, idade, mensalidade, ativo, linguagens } = dados;
        const query = `
            UPDATE alunos
            SET nome = $1, idade = $2, mensalidade = $3, ativo = $4, linguagens = $5
            WHERE id = $6
            RETURNING id, nome, idade, mensalidade, ativo, linguagens, data_de_cadastro AS "dataDeCadastro"
        `;

        const resultado = await pool.query(query, [nome, idade, mensalidade, ativo, linguagens, id]);
        return resultado.rows[0] || null;
    }

    // Atualiza apenas os campos informados de um aluno. Retorna null se não encontrado.
    async atualizarParcialmente(id, dados) {
        const { nome, idade, mensalidade, ativo, linguagens } = dados;
        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) { 
            campos.push(`nome = $${contador++}`);
            valores.push(nome);
        }
        if (idade !== undefined) { 
            campos.push(`idade = $${contador++}`);
            valores.push(idade);
        }
        if (mensalidade !== undefined) {
            campos.push(`mensalidade = $${contador++}`);
            valores.push(mensalidade);
        }
        if (ativo !== undefined) {
            campos.push(`ativo = $${contador++}`);
            valores.push(ativo);
        }
        if (linguagens !== undefined) {
            campos.push(`linguagens = $${contador++}`);
            valores.push(linguagens);
        }

        valores.push(id);

        const query = `
            UPDATE alunos
            SET ${campos.join(', ')}
            WHERE id = $${contador}
            RETURNING id, nome, idade, mensalidade, ativo, linguagens, data_de_cadastro AS "dataDeCadastro"
        `;

        const resultado = await pool.query(query, valores);
        return resultado.rows[0] || null;
    }

    // Remove um aluno pelo ID.
    async remover(id) {
        const query = `DELETE FROM alunos WHERE id = $1`;
        await pool.query(query, [id]);
    }
}

module.exports = new AlunoDAO();