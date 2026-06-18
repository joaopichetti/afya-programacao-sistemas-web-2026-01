import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunoList from '../componentes/AlunoList';
import AlunoFilter from '../componentes/AlunoFilter';
import { obterAlunos, excluirAluno, atualizarStatusAluno } from '../services/api';

function AlunoListPage() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
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
  };

  const editarAluno = (aluno) => {
    navigate(`/formulario/${aluno.id}`);
  };

  const removerAluno = async (id) => {
    const confirm = window.confirm('Tem certeza que deseja remover este aluno?');
    if (confirm) {
      try {
        await excluirAluno(id);
        carregarAlunos();
      } catch (erro) {
        window.alert(erro.message);
      }
    }
  };

  const alterarStatus = async (id) => {
    const aluno = alunos.find((aluno) => aluno.id === id);
    if (!aluno) return;

    try {
      await atualizarStatusAluno(id, !aluno.ativo);
      carregarAlunos();
    } catch (erro) {
      window.alert(erro.message);
    }
  };

  return (
    <section className="list-section">
      <AlunoFilter 
        callbackFiltrar={atualizarFiltros}
        filtroAtual={filtros} />
      <button 
        className="btn-primary btn-novo-aluno" 
        onClick={() => navigate('/formulario')}>
        + Novo Aluno
      </button>
      <AlunoList
        alunos={alunos}
        callbackRemover={removerAluno}
        callbackEditar={editarAluno}
        callbackAlterarStatus={alterarStatus}
        carregando={carregando}
        erroAoCarregar={erroAoCarregar}
      />
    </section>
  );
}

export default AlunoListPage;