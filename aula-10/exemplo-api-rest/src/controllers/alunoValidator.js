// Valida os dados recebidos para criação ou atualização de um aluno.
// O parâmetro isPatch indica se a validação é parcial (PATCH) ou completa (POST/PUT).
function validarDadosAluno(nome, idade, mensalidade, ativo, linguagens, atualizacaoParcial = false) {
    if (atualizacaoParcial && !nome && !idade && !mensalidade && (ativo === undefined || ativo === null) && !linguagens) {
        return ["Informe algum campo para atualizar."];
    }
    if (!atualizacaoParcial && (!nome || !idade || ativo === undefined || ativo === null)) {
        return ["Nome, idade e ativo são campos obrigatórios."];
    }

    const erros = [];

    if (nome !== undefined && typeof nome !== 'string') {
        erros.push("O campo 'nome' deve ser String.");
    }
    if (idade !== undefined && typeof idade !== 'number') {
        erros.push("O campo 'idade' deve ser Number.");
    }
    if (mensalidade !== undefined && typeof mensalidade !== 'number') {
        erros.push("O campo 'mensalidade' deve ser Number.");
    }
    if (ativo !== undefined && ativo !== null && typeof ativo !== 'boolean') {
        erros.push("O campo 'ativo' deve ser Boolean.");
    }
    if (linguagens !== undefined && !Array.isArray(linguagens)) {
        erros.push("O campo 'linguagens' deve ser um Array.");
    }

    return erros;
}

module.exports = { validarDadosAluno };