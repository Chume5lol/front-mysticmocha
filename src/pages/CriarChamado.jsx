import { useAuth } from "../context/Context";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../components/Chamados.css"

export default function CriarChamado() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
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
                    width: "100vw",
                    gap: "20px",
                }}
            >


                <form method="post" className="formulario">
                    <h2>Abertura de chamados</h2>
                    <label>Categoria</label>
                    <select name="" id="" className="select">
                        <option value="">Problemas com impressora</option>
                        <option value="">Problemas com perifericos</option>
                        <option value="">Problemas com computador</option>
                        <option value="">Liberação de site</option>
                        <option value="">E-mail</option>
                        <option value="">Instalação de software</option>
                        <option value="">Problemas com aplicativo</option>
                        <option value="">Problema com sistemas</option>
                        <option value="">Telefonia</option>
                        <option value="">Mudança de local</option>
                        <option value="">Solicitação de equipamento</option>
                    </select><br></br>

                    <label>Título</label><br />
                    <input type="text" /><br />

                    <label>Descrição</label><br />
                    <input type="text" /><br /><br />

                    <button type="submit">Criar chamado</button>
                </form>

            </div>
        </Layout>
    );
}
