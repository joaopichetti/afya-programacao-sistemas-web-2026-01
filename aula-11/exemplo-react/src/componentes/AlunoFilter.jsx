import { useState } from "react";

function AlunoFilter({ callbackFiltrar }) {
    const [nome, setNome] = useState('');
    const [ativo, setAtivo] = useState('');
    const [linguagem, setLinguagem] = useState('');
    
    const filtrar = (event) => {
        event.preventDefault();
        callbackFiltrar({ nome, ativo, linguagem });
    };

    const limparFiltro = () => {
        setNome('');
        setAtivo('');
        setLinguagem('');
        callbackFiltrar({ nome: '', ativo: '', linguagem: '' });
    };

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 className="card-title" style={{ marginBottom: '1rem', fontSize: '1.1rem', paddingBottom: '0.5rem' }}>Filtros</h2>
            <form onSubmit={filtrar} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
                <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label htmlFor="filtro-nome">Nome</label>
                    <input
                        type="text"
                        id="filtro-nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        placeholder="Buscar por nome..." />
                </div>

                <div className="form-group" style={{ flex: 1, minWidth: '120px' }}>
                    <label htmlFor="filtro-ativo">Status</label>
                    <select
                        id="filtro-ativo"
                        value={ativo}
                        onChange={(event) => setAtivo(event.target.value)}>
                        <option value="">Todos</option>
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </select>
                </div>

                <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label htmlFor="filtro-linguagem">Linguagem</label>
                    <input
                        type="text"
                        id="filtro-linguagem"
                        value={linguagem}
                        onChange={(event) => setLinguagem(event.target.value)}
                        placeholder="Ex: JavaScript" />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                        type="button"
                        className="btn-secondary"
                        onClick={limparFiltro}
                        style={{ minWidth: '90px', padding: '0.6rem 1rem', height: '100%' }}>
                        Limpar
                    </button>
                    <button
                        type="submit"
                        className="btn-primary" style={{ minWidth: '90px', padding: '0.6rem 1rem', height: '100%' }}>
                        Filtrar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AlunoFilter;