import { useAuth } from "../context/Context";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../components/Chamados.css"
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function CriarChamado() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const userId = user.id;
    const [cat, setCat] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [tit, setTit] = useState("");
    const [desc, setDesc] = useState("");
    const [erro, setErro] = useState("");

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    const handleCriarChamado = async (e) => {
        e.preventDefault();
        console.log(user)
        const agora = new Date();
        agora.setHours(agora.getHours() - 3);
        try {
            const response = await axios.post("http://localhost:8080/chamados/criarChamado", {
                categoria: cat,
                titulo: tit,
                descricao: desc,
                solicitante: { id: userId },
                dataAbertura: agora,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}` 
                }
            })
            toast.success("Chamado criado com sucesso!", {
                autoClose: 2500,
            });
            setTit("");
            setDesc("");
            setCat("");
            setTimeout(() => {
                navigate("/home/meusChamado");
            }, 1500);
        }
        catch (err) {
            console.error(err);
            setErro(err.response?.data?.message || "Erro ao criar chamado");
        }
    }

    return (
        <Layout>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "calc(100vh - 100px)",
                    width: "83vw",
                    gap: "20px",
                }}
            >


                <form method="post" className="formulario" onSubmit={handleCriarChamado}>
                    <h2>Abertura de chamados</h2>

                    {erro && <p style={{ color: "red" }}>{erro}</p>}
                    {sucesso && <p style={{ color: "green" }}>Chamado criado</p>}

                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" required className="select" value={cat} onChange={(e) => setCat(e.target.value)}

                    >
                        <option value="" disabled selected></option>
                        <option value="impressora">Problemas com impressora</option>
                        <option value="perifericos">Problemas com perifericos</option>
                        <option value="computador">Problemas com computador</option>
                        <option value="site">Liberação de site</option>
                        <option value="email">E-mail</option>
                        <option value="software">Instalação de software</option>
                        <option value="aplicativo">Problemas com aplicativo</option>
                        <option value="sistemas">Problema com sistemas</option>
                        <option value="telefonia">Telefonia</option>
                        <option value="mudanca">Mudança de local</option>
                        <option value="equipamento">Solicitação de equipamento</option>
                    </select><br></br>

                    <label htmlFor="titulo">Título</label><br />
                    <input type="text" id="titulo" required maxLength={120} value={tit} onChange={(e) => setTit(e.target.value)}
                    /><br />

                    <label htmlFor="descricao">Descrição</label><br />
                    <input type="text" id="descricao" required maxLength={1500} value={desc} onChange={(e) => setDesc(e.target.value)}
                    />
                    <button type="submit" >Criar chamado</button>
                </form>

            </div>
        </Layout>
    );
}
