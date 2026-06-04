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

module.exports = { Aluno };