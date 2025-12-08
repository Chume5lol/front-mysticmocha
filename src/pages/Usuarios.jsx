import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../components/UsuariosModal.css";
import axios from "axios";

const API_URL = "http://localhost:8080"; 

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioAtual, setUsuarioAtual] = useState({
        id: null,
        nome: "",
        sobrenome: "",
        email: "",
        nickname: "",
        departamento: "",
        cargo: "",
        senha: "",
        perfil: "CLIENTE",
        habilitado: true,
    });


    //  usuários
    const buscarUsuarios = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/administrador/usuarios`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUsuarios(res.data);
        } catch (err) {
            alert("Erro ao buscar usuários: " + err.response?.data);
        }
    };

    useEffect(() => {
        buscarUsuarios();
    }, []);

    // Abrir modal para novo usuário
    const abrirModalNovo = () => {
        setUsuarioAtual({
            id: null,
            nome: "",
            sobrenome: "",
            email: "",
            nickname: "",
            senha: "",
            perfil: "CLIENTE",
        });
        setModalAberto(true);
    };

    // Abrir modal para edição
    const abrirModalEditar = (usuario) => {
        setUsuarioAtual(usuario);
        setModalAberto(true);
    };

    // Fechar modal
    const fecharModal = () => setModalAberto(false);

    // Mandar formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (usuarioAtual.id) {
                // edição
                await axios.put(`${API_URL}/administrador/usuarios/${usuarioAtual.id}`, usuarioAtual, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
                alert("Usuário atualizado com sucesso!");
            } else {
                // criação
                await axios.post(`${API_URL}/administrador/cadastro`, usuarioAtual, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
                alert("Usuário criado com sucesso!");
            }
            fecharModal();
            buscarUsuarios();
        } catch (err) {
            alert("Erro ao salvar usuário: " + err.response?.data);
        }
    };

    // Atualiza campos do formulário
    const handleChange = (e) => {
        setUsuarioAtual({ ...usuarioAtual, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
            <h2>Bem vindo à criação e alteração de usuários</h2>
            <button onClick={abrirModalNovo}>Novo Usuário</button>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Nickname</th>
                        <th>Perfil</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.nome}</td>
                            <td>{u.email}</td>
                            <td>{u.nickname}</td>
                            <td>{u.perfil}</td>
                            <td>
                                <button onClick={() => abrirModalEditar(u)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAberto && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{usuarioAtual.id ? "Editar Usuário" : "Novo Usuário"}</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="nome"
                                placeholder="Nome"
                                value={usuarioAtual.nome}
                                onChange={handleChange}
                            />
                            <input
                                name="sobrenome"
                                placeholder="Sobrenome"
                                value={usuarioAtual.sobrenome}
                                onChange={handleChange}
                            />
                            <input
                                name="email"
                                placeholder="Email"
                                value={usuarioAtual.email}
                                onChange={handleChange}
                            />
                            <input
                                name="nickname"
                                placeholder="Nickname"
                                value={usuarioAtual.nickname}
                                onChange={handleChange}
                            />
                            <input
                                name="departamento"
                                placeholder="Departamento"
                                value={usuarioAtual.departamento}
                                onChange={handleChange}
                            />
                            <input
                                name="cargo"
                                placeholder="Cargo"
                                value={usuarioAtual.cargo}
                                onChange={handleChange}
                            />
                            <select
                                name="habilitado"
                                value={usuarioAtual.habilitado}
                                onChange={(e) =>
                                    setUsuarioAtual({ ...usuarioAtual, habilitado: e.target.value === "true" })
                                }
                            >
                                <option value="true">Habilitado</option>
                                <option value="false">Desabilitado</option>
                            </select>

                            <input
                                name="senha"
                                type="password"
                                placeholder="Senha"
                                value={usuarioAtual.senha || ""}
                                onChange={handleChange}
                            />
                            <select
                                name="perfil"
                                value={usuarioAtual.perfil}
                                onChange={handleChange}
                            >
                                <option value="CLIENTE">Cliente</option>
                                <option value="ADMINISTRADOR">Administrador</option>
                                <option value="GESTOR">Gestor</option>
                                <option value="PRESTADOR">Prestador</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={fecharModal}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
