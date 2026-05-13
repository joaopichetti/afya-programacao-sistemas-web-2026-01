import { useState } from "react";
import './App.css';
import AlunoCard from './components/AlunoCard';

function App() {
  // Estado para armazenar a lista em memória
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [mensalidade, setMensalidade] = useState('');
  const [ativo, setAtivo] = useState('');
  const [linguagensInput, setLinguagensInput] = useState('');
  const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);

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

    if (alunoEmEdicao) {
      setAlunos(alunos.map(aluno =>
        aluno.id === alunoParaSalvar.id 
          ? alunoParaSalvar : aluno
      ));
      setAlunoEmEdicao(null);
    } else {
      setAlunos([...alunos, alunoParaSalvar]);
    }
    limparFormulario();
  };

  const carregarAlunoParaEditar = (aluno) => {
    setAlunoEmEdicao(aluno);
    setNome(aluno.nome);
    setIdade(aluno.idade);
    setMensalidade(aluno.mensalidade);
    setAtivo(aluno.ativo);
    setLinguagensInput(aluno.linguagens.join(', '));
  };

  const removerAluno = (id) => {
    const confirm = window.confirm(
      'Tem certeza que deseja remover este aluno?'
    );
    if (!confirm) return;
    setAlunos(alunos.filter(aluno => aluno.id !== id));
    if (alunoEmEdicao && alunoEmEdicao.id === id) {
      cancelarEdicao();
    }
  };

  const cancelarEdicao = () => {
    setAlunoEmEdicao(null);
    limparFormulario();
  }

  const limparFormulario = () => {
    setNome('');
    setIdade('');
    setMensalidade('');
    setAtivo(true);
    setLinguagensInput('');
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Painel de Alunos</h1>
        <p>Gestão de alunos matriculados na disciplina de Sistemas Web</p>
      </header>

      <main className="main-content">
        <section className="form-section">      
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
                <button type="submit" className="btn-primary">
                  {alunoEmEdicao ? 'Atualizar Aluno' : 'Cadastrar Aluno'}
                </button>
                
                {alunoEmEdicao && (
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={cancelarEdicao}
                  >
                    Cancelar Edição
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        <section className="list-section">
          <div className='list-grid'>
            {alunos.map((aluno) => (
              <AlunoCard 
                key={aluno.id}
                aluno={aluno}
                callbackRemover={removerAluno}
                callbackEditar={carregarAlunoParaEditar}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;