import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizarAluno, criarAluno, obterAluno } from "../services/api";
import AlunoForm from "../componentes/AlunoForm";

function AlunoFormPage() {
    const navigate = useNavigate();
    const { id: alunoId } = useParams();

    const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erroAoCarregar, setErroAoCarregar] = useState(null);

    const carregarAluno = useCallback(async () => {
        setCarregando(true);
        setErroAoCarregar(null);
        try {
            const aluno = await obterAluno(alunoId);
            setAlunoEmEdicao(aluno);
        } catch {
            setErroAoCarregar(
                'Não foi possível carregar os dados do aluno. Tente novamente.'
            );
        } finally {
            setCarregando(false);
        }
    }, [alunoId]);

    useEffect(() => {
        if (!alunoId) return;

        carregarAluno();
    }, [alunoId, carregarAluno]);

    const salvarAluno = async (alunoParaSalvar) => {
        try {
            if (alunoEmEdicao) {
                await atualizarAluno(alunoParaSalvar.id, alunoParaSalvar);
            } else {
                await criarAluno(alunoParaSalvar);
            }
            navigate('/');
        } catch (erro) {
            if (erro.response && erro.response.status == 400) {
                const mensagemServidor = 
                    'Erro de validação. Verifique os dados e tente novamente';
                alert(mensagemServidor);
            } else {
                alert(
                    'Ocorreu um erro inesperado. Aguerde um momento e tente novamente'
                );
            }
        }
    };

    const cancelarEdicao = () => {
        navigate('/');
    };

    const renderizarConteudo= () => {
        if (carregando) {
            return (
                <div className="empty-state">
                    Carregando dados do aluno...
                </div>
            );
        }

        if (erroAoCarregar) {
            return (
                <div className="empty-state" style={{ color: 'var(--danger-color)'}}>
                    {erroAoCarregar}
                </div>
            );
        }

        return (
            <AlunoForm
                key={alunoEmEdicao?.id || 'novo'}
                alunoEmEdicao={alunoEmEdicao}
                callbackSalvar={salvarAluno}
                callbackCancelar={cancelarEdicao}
            />
        );
    };

    return (
        <section className="form-section">
            {renderizarConteudo()}
        </section>
    );
}

export default AlunoFormPage;