import { useState } from "react";
import './App.css';
import AlunoList from './componentes/AlunoList';
import AlunoForm from './componentes/AlunoForm';

function App() {
  // Estado para armazenar a lista em memória
  const [alunos, setAlunos] = useState([]);
  const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);

  const carregarAlunoParaEditar = (aluno) => {
    setAlunoEmEdicao(aluno);
  };

  const salvarAluno = (alunoParaSalvar) => {
    if (alunoEmEdicao) {
      setAlunos(alunos.map(aluno =>
        aluno.id === alunoParaSalvar.id ? alunoParaSalvar : aluno));
        setAlunoEmEdicao(null);
    } else {
      setAlunos([...alunos, alunoParaSalvar]);
    }
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
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Painel de Alunos</h1>
        <p>Gestão de alunos matriculados na disciplina de Sistemas Web</p>
      </header>

      <main className="main-content">
        <section className="form-section">      
          <AlunoForm 
            key={alunoEmEdicao?.id || 'novo'}
            alunoEmEdicao={alunoEmEdicao}
            callbackSalvar={salvarAluno}
            callbackCancelar={cancelarEdicao}
          />
        </section>

        <section className="list-section">
          <AlunoList
            alunos={alunos}
            callbackRemover={removerAluno}
            callbackEditar={carregarAlunoParaEditar}
          />
        </section>
      </main>
    </div>
  );
}

export default App;