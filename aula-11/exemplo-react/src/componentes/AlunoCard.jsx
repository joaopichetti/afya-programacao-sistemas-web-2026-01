function AlunoCard({ 
    aluno, 
    callbackRemover, 
    callbackEditar,
    callbackAlterarStatus,
}) {
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
                <div className="status-toggle" 
                    title="Alterna Status (Ativo/Inativo)">
                    <span style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 500, 
                        color: aluno.ativo 
                            ? 'var(--success-color)' 
                            : 'var(--danger-color)' }}>
                        {aluno.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                    <label className="switch">
                        <input 
                            type="checkbox"
                            checked={aluno.ativo}
                            onChange={() => callbackAlterarStatus(aluno.id)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
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