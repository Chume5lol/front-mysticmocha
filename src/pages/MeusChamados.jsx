import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from '../context/Context';
import "../components/MeusChamados.css";
import axios from "axios";
import ChamadoModal from "../components/ChamadoModal";

export default function MeusChamados() {
    const [filtro, setFiltro] = useState("");
    const [chamados, setChamados] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

    useEffect(() => {
        if (!user) return;

        axios.get(`http://localhost:8080/chamados/listar/${user.id}`, {
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

    return (
        <Layout>
            <div style={{ marginTop: "10vh", width: "73vw", marginLeft: sidebarOpen ? "" : "160px" }}>
                <h2>Meus chamados</h2>

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
                                        <td colSpan="8" className="tabela-sem-resultados">
                                            Nenhum resultado encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    dadosFiltrados.map((item) => (
                                        <tr key={item.id}>
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
    );
}
