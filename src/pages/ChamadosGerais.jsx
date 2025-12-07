import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/Context";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/MeusChamados.css";
import ChamadoModal from "../components/ChamadoModal";


export default function ChamadosGerais() {
    const [filtro, setFiltro] = useState("");
    const [chamados, setChamados] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [chamadoSelecionado, setChamadoSelecionado] = useState(null);



    if (!user) {
        return <navigate to="/login" replace />;
    }

    useEffect(() => {
        console.log(user)
        if (!user) return;

        axios.get(`http://localhost:8080/administrador/chamados`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setChamados(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar chamados:", error);
            });
    }, [user]);



    const dadosFiltrados = useMemo(() => {
        return chamados.filter((item) =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(filtro.toLowerCase())
        );
    }, [filtro, chamados]);

    return <>

        <Layout>
            <div style={{ marginTop: "10vh", width: "85vw", marginLeft: sidebarOpen ? "" : "", }}>
                <h2 style={{ textAlign: "center" }}>Chamados gerais</h2>

                <div className="tabela-container">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="tabela-pesquisa"
                    />

                    <div className="tabela-wrapper">
                        <table className="tabela">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Categoria</th>
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Status</th>
                                    <th>Solicitante</th>
                                    <th>Atendente</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dadosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="tabela-sem-resultados">
                                            Nenhum resultado encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    dadosFiltrados.map((item) => (
                                        <tr key={item.id} style={{ cursor: "pointer" }}>
                                            <td>{item.id}</td>
                                            <td>{item.categoria}</td>
                                            <td>{item.titulo}</td>
                                            <td className="descricao">{item.descricao}</td>
                                            <td>{item.status}</td>
                                            <td>{item.solicitante.nome + " " + item.solicitante.sobrenome}</td>
                                            <td>{item.atendente?.nome || "-"}</td>
                                            <td>
                                                <button onClick={() => setChamadoSelecionado(item)}>Abrir</button>
                                            </td>


                                        </tr>

                                    ))
                                )}
                            </tbody>
                        </table>
                        {chamadoSelecionado && (
                            <ChamadoModal
                                chamado={chamadoSelecionado}
                                isOpen={!!chamadoSelecionado}
                                onClose={() => setChamadoSelecionado(null)}
                                atualizarChamados={(atualizado) => {
                                    setChamados(prev =>
                                        prev.map(c => c.id === atualizado.id ? atualizado : c)
                                    );
                                }}
                            />
                        )}

                    </div>
                </div>
            </div>
        </Layout>
    </>
}