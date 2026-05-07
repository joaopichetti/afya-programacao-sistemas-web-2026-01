import { useState } from "react";
import './App.css';

function App() {
  // Estado para armazenar a lista em memória
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);

  const salvarAluno = (event) => {
    event.preventDefault();

    if (!nome.trim()) {
      window.alert('Informe o nome do aluno');
      return;
    }

    const alunoParaSalvar = {
      id: alunoEmEdicao ? alunoEmEdicao.id : Date.now(),
      nome: nome,
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
    setNome('');
  };

  const carregarAlunoParaEditar = (aluno) => {
    setAlunoEmEdicao(aluno);
    setNome(aluno.nome);
  };

  const removerAluno = (event, id) => {
    event.stopPropagation();
    const confirm = window.confirm(
      'Tem certeza que deseja remover este aluno?'
    );
    if (!confirm) return;
    setAlunos(alunos.filter(aluno => aluno.id !== id));
    if (alunoEmEdicao && alunoEmEdicao.id === id) {
      setAlunoEmEdicao(null);
      setNome('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Portal de Alunos</h1>
      <form onSubmit={salvarAluno}>
        <input type="text" placeholder="Nome do Aluno" value={nome}
            onChange={(event) => setNome(event.target.value)}
            required />
        <button type="submit">
          {alunoEmEdicao ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id} onClick={() => carregarAlunoParaEditar(aluno)}>
            <span>{aluno.id} - {aluno.nome}</span>
            <button onClick={(event) => removerAluno(event, aluno.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;