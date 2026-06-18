import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AlunoListPage from './paginas/AlunoListPage';
import AlunoFormPage from './paginas/AlunoFormPage';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Painel de Alunos</h1>
        <p>Gestão de alunos matriculados na disciplina de Sistemas Web</p>
      </header>

      <main className="main-content">
        <BrowserRouter>
          <Routes>
            <Route path='/' 
              element={<AlunoListPage />} />
            <Route path='/formulario/:id?'
              element={<AlunoFormPage />} />
            <Route path='*' 
              element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;