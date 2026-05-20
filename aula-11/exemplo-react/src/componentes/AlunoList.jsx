import AlunoCard from './AlunoCard';

function AlunoList({
    alunos, 
    callbackRemover, 
    callbackEditar,
    callbackAlterarStatus,
    carregando,
    erroAoCarregar
 }) {
    if (carregando) {
        return (
            <div className='empty-state'>Carregando alunos...</div>
        );
    }

    if (erroAoCarregar) {
        return (
            <div className='empty-state' style={{ color: 'var(--danger-color)' }}>
                {erroAoCarregar}
            </div>
        );
    }

    if (alunos.length === 0) {
        return (
            <div className='empty-state'>
                <p>Nenhum aluno cadastrado no momento.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Preencha o formulário para adicionar um aluno.
                </p>
            </div>
        );
    }

    return (
        <div className='list-grid'>
            {alunos.map((aluno) => (
              <AlunoCard
                key={aluno.id}
                aluno={aluno}
                callbackRemover={callbackRemover}
                callbackEditar={callbackEditar}
                callbackAlterarStatus={callbackAlterarStatus}
              />
            ))}
        </div>
    );
}

export default AlunoList;