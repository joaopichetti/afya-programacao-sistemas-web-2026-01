function AlunoCard({ aluno, callbackRemover, callbackEditar }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div className="card aluno-card" key={aluno.id}>
            <div className="aluno-header">
                <h3 className="aluno-name">{aluno.nome}</h3>
                <span className={`badge ${aluno.ativo ? 'ativo' : 'inativo'}`}>
                {aluno.ativo ? 'Ativo' : 'Inativo'}
                </span>
            </div>
            
            <div className="aluno-info">
                <div className="info-row">
                <span>Idade:</span>
                <strong>{aluno.idade} anos</strong>
                </div>
                <div className="info-row">
                <span>Mensalidade:</span>
                <strong>{formatCurrency(aluno.mensalidade)}</strong>
                </div>
                <div className="info-row">
                <span>Data de Cadastro:</span>
                <strong>{formatDate(aluno.dataDeCadastro)}</strong>
                </div>
            </div>

            {aluno.linguagens && aluno.linguagens.length > 0 && (
                <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Linguagens:</span>
                <div className="tags-container">
                    {aluno.linguagens.map((lang, index) => (
                    <span key={index} className="tag">{lang}</span>
                    ))}
                </div>
                </div>
            )}

            <div className="card-actions">
                <button 
                className="btn-edit btn-sm"
                onClick={() => callbackEditar(aluno)}
                >
                Editar
                </button>
                <button 
                className="btn-danger btn-sm"
                onClick={() => callbackRemover(aluno.id)}
                >
                Remover
                </button>
            </div>
        </div>
    );
}

export default AlunoCard;