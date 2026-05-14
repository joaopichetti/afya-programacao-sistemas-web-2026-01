import { useState } from "react";

function AlunoForm({ alunoEmEdicao, callbackSalvar, callbackCancelar }) {
    const [nome, setNome] = useState(alunoEmEdicao?.nome || '');
    const [idade, setIdade] = useState(alunoEmEdicao?.idade || '');
    const [mensalidade, setMensalidade] = useState(
        alunoEmEdicao?.mensalidade || ''
    );
    const [ativo, setAtivo] = useState(!alunoEmEdicao || alunoEmEdicao.ativo);
    const [linguagensInput, setLinguagensInput] = useState(
        alunoEmEdicao?.linguagens 
            ? alunoEmEdicao.linguagens.join(', ') 
            : ''
    );

    const limparFormulario = () => {
        setNome('');
        setIdade('');
        setMensalidade('');
        setAtivo(true);
        setLinguagensInput('');
    }

    const salvarAluno = (event) => {
        event.preventDefault();

        if (!nome.trim() || !idade) {
            window.alert('Nome e Idade são obrigatórios');
            return;
        }

        const linguagensArray = linguagensInput
            .split(',')
            .map(linguagem => linguagem.trim())
            .filter(linguagem => linguagem !== '');

        const alunoParaSalvar = {
            id: alunoEmEdicao ? alunoEmEdicao.id : Date.now(),
            nome: nome.trim(),
            idade: Number(idade),
            mensalidade: Number(mensalidade),
            ativo: ativo,
            linguagens: linguagensArray,
            dataDeCadastro: alunoEmEdicao 
                ? alunoEmEdicao.dataDeCadastro : new Date().toISOString(),
        };

        callbackSalvar(alunoParaSalvar);
        limparFormulario();
    };

    return (
        <div className="card">
            <h2 className="card-title">{alunoEmEdicao ? 'Editar Aluno' : 'Novo Aluno'}</h2>
            <form onSubmit={salvarAluno} className="aluno-form">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo *</label>
                <input 
                  type="text" 
                  id="nome" 
                  value={nome} 
                  onChange={(event) => setNome(event.target.value)} 
                  placeholder="Ex: João da Silva"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="idade">Idade *</label>
                <input 
                  type="number" 
                  id="idade" 
                  value={idade} 
                  onChange={(event) => setIdade(event.target.value)} 
                  placeholder="Ex: 25"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensalidade">Mensalidade (R$)</label>
                <input 
                  type="number" 
                  id="mensalidade" 
                  value={mensalidade} 
                  onChange={(event) => setMensalidade(event.target.value)} 
                  placeholder="Ex: 500.00"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="linguagens">Linguagens (separadas por vírgula)</label>
                <input 
                  type="text" 
                  id="linguagens" 
                  value={linguagensInput} 
                  onChange={(event) => setLinguagensInput(event.target.value)} 
                  placeholder="Ex: JavaScript, Python, Java"
                />
              </div>

              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="ativo" 
                  checked={ativo} 
                  onChange={(event) => setAtivo(event.target.checked)} 
                />
                <label htmlFor="ativo">Aluno Ativo</label>
              </div>

              <div className="aluno-form-actions">
                {alunoEmEdicao && (
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={callbackCancelar}
                  >
                    Cancelar Edição
                  </button>
                )}

                <button type="submit" className="btn-primary">
                  {alunoEmEdicao ? 'Atualizar Aluno' : 'Cadastrar Aluno'}
                </button>
              </div>
            </form>
        </div>
    );
}

export default AlunoForm;