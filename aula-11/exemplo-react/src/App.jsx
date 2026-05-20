import { useState } from "react";
import './App.css';
import AlunoList from './componentes/AlunoList';
import AlunoForm from './componentes/AlunoForm';
import AlunoFilter from './componentes/AlunoFilter';

function App() {
  // Estado para armazenar a lista em memória
  const [alunos, setAlunos] = useState([]);
  const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);
  const [filtros, setFiltros] = useState({ nome: '', ativo: '', linguagem: '' });

  const atualizarFiltros = (novosFiltros) => {
    setFiltros(novosFiltros);
  }

  const alunosFiltrados = alunos.filter(aluno => {
    let nomeCombina = true;
    let ativoCombina = true;
    let linguagemCombina = true;

    if (filtros.nome) {
      nomeCombina = aluno.nome.toLowerCase().includes(filtros.nome.toLowerCase());
    }

    if (filtros.ativo !== '') {
      const estaAtivo = filtros.ativo === 'true';
      ativoCombina = aluno.ativo === estaAtivo;
    }

    if (filtros.linguagem) {
      const busca = filtros.linguagem.toLowerCase();
      linguagemCombina = aluno.linguagens && aluno.linguagens.some(linguagem => linguagem.toLowerCase().includes(busca));
    }

    return nomeCombina && ativoCombina && linguagemCombina;
  });

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

  const alterarStatus = (id) => {
    setAlunos(alunos.map(aluno => {
      if (aluno.id === id) {
        aluno.ativo = !aluno.ativo;
      }
      return aluno;
    }));
  };

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
          <AlunoFilter callbackFiltrar={atualizarFiltros} />
          <AlunoList
            alunos={alunosFiltrados}
            callbackRemover={removerAluno}
            callbackEditar={carregarAlunoParaEditar}
            callbackAlterarStatus={alterarStatus}
          />
        </section>
      </main>
    </div>
  );
}

export default App;