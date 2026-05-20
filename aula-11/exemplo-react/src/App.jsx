import { useCallback, useEffect, useState } from "react";
import './App.css';
import AlunoList from './componentes/AlunoList';
import AlunoForm from './componentes/AlunoForm';
import AlunoFilter from './componentes/AlunoFilter';
import { obterAlunos, criarAluno, atualizarAluno, atualizarStatusAluno, excluirAluno } from "./services/api";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erroAoCarregar, setErroAoCarregar] = useState(null);
  const [filtros, setFiltros] = useState(() => {
  const filtrosArmazenados = window.sessionStorage.getItem('filtros');
    if (filtrosArmazenados) {
      return JSON.parse(filtrosArmazenados);
    }
    return { nome: '', ativo: '', linguagem: '' };
  });

  useEffect(() => {
    window.sessionStorage.setItem('filtros', JSON.stringify(filtros));
  }, [filtros]);

  const carregarAlunos = useCallback(async () => {
    setCarregando(true);
    setErroAoCarregar(null);
    try {
      const data = await obterAlunos(filtros);
      setAlunos(data);
    } catch (erro) {
      setErroAoCarregar(erro.message);
    } finally {
      setCarregando(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregarAlunos();
  }, [carregarAlunos]);

  const atualizarFiltros = (novosFiltros) => {
    setFiltros(novosFiltros);
  }

  const carregarAlunoParaEditar = (aluno) => {
    setAlunoEmEdicao(aluno);
  };

  const salvarAluno = async (alunoParaSalvar) => {
    try {
      if (alunoEmEdicao) {
        await atualizarAluno(alunoParaSalvar.id, alunoParaSalvar);
      } else {
        await criarAluno(alunoParaSalvar);
      }
      setAlunoEmEdicao(null);
      carregarAlunos();
    } catch (erro) {
      window.alert(erro.message);
    }
  };

  const removerAluno = async (id) => {
    const confirm = window.confirm(
      'Tem certeza que deseja remover este aluno?'
    );
    if (!confirm) return;

    try {
      await excluirAluno(id);
      if (alunoEmEdicao && alunoEmEdicao.id === id) {
        cancelarEdicao();
      }
      carregarAlunos();
    } catch (erro) {
      window.alert(erro.message);
    }
  };

  const cancelarEdicao = () => {
    setAlunoEmEdicao(null);
  }

  const alterarStatus = async (id) => {
    const aluno = alunos.find(aluno => aluno.id === id);
    if (!aluno) return;

    try {
      await atualizarStatusAluno(id, !aluno.ativo);
      carregarAlunos();
    } catch (erro) {
      window.alert(erro.message);
    }
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
          <AlunoFilter callbackFiltrar={atualizarFiltros} filtroAtual={filtros} />
          <AlunoList
            alunos={alunosFiltrados}
            callbackRemover={removerAluno}
            callbackEditar={carregarAlunoParaEditar}
            callbackAlterarStatus={alterarStatus}
            carregando={carregando}
            erroAoCarregar={erroAoCarregar}
          />
        </section>
      </main>
    </div>
  );
}

export default App;