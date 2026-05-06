import { useState } from "react";

function App() {
  // Estado para armazenar a lista em memória
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');

  const salvarAluno = (event) => {
    event.preventDefault();
    const novoAluno = {
      id: Date.now(),
      nome: nome,
    };
    setAlunos([...alunos, novoAluno]);
    setNome('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Portal de Alunos</h1>
      <form onSubmit={salvarAluno}>
        <input type="text" placeholder="Nome do Aluno" value={nome}
            onChange={(event) => setNome(event.target.value)}
            required />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>{aluno.id} - {aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;