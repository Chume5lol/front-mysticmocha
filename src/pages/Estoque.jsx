import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Estoque() {

    const API_URL = "http://localhost:8080"; 

    const [produtos, setProdutos] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoAtual, setProdutoAtual] = useState({
        id: null,
        nome: "",
        descricao: "",
        codigoProduto: "",
        quantidade: "",
        preco: "",
        ativo: true,
    });


    //  produtos
    const buscarProdutos = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/estoque`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data == null){
                return console.log("Não foram encontrados produtos")
            }
            setProdutos(res.data);
        } catch (err) {
            console.log(err)
            alert("Erro ao buscar produtos: " + err);
        }
    };
    
    // Mandar formulario dos produtos
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (produtoAtual.id) {
                // edição
                await axios.put(`${API_URL}/estoque/${produtoAtual.id}`, produtoAtual, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
                alert("Produto atualizado com sucesso!");
            } else {
                // criação
                await axios.post(`${API_URL}/estoque`, produtoAtual, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
                alert("Produto criado com sucesso!");
            }
            fecharModal();
            buscarProdutos();
        } catch (err) {
            alert("Erro ao salvar produto: " + err);
        }
    };

    // Atualiza campos do formulário
    const handleChange = (e) => {
        setProdutoAtual({ ...produtoAtual, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        buscarProdutos();
    }, []);

    // Abrir modal para novo produto
    const abrirModalNovo = () => {
        setProdutoAtual({
            id: null,
            nome: "",
            descricao: "",
            codigoProduto: "",
            quantidade: "",
            preco: "",
            ativo: true,
        });
        setModalAberto(true);
    };


    // Abrir modal para edição
    const abrirModalEditar = (produto) => {
        setProdutoAtual(produto);
        setModalAberto(true);
    };

    // Fechar modal
    const fecharModal = () => setModalAberto(false);


    return (
        <Layout>
            <h2>Estoque</h2>

            <button onClick={abrirModalNovo}>Adicionar Produto</button>

            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((p) => (
                        <tr key={p.codigoProduto}>
                            <td>{p.nome}</td>
                            <td>{p.descricao}</td>
                            <td>{p.preco}</td>
                            <td>{p.quantidade}</td>
                            <td>
                                <button onClick={() => abrirModalEditar(p)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAberto && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{produtoAtual.id ? "Editar Produto" : "Adicionar novo produto"}</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="nome"
                                placeholder="Nome"
                                value={produtoAtual.nome}
                                onChange={handleChange}
                            />
                            <input
                                name="descricao"
                                placeholder="Descrição"
                                value={produtoAtual.descricao}
                                onChange={handleChange}
                            />
                            <input
                                name="preco"
                                placeholder="Preço"
                                value={produtoAtual.preco}
                                onChange={handleChange}
                            />
                            <input
                                name="quantidade"
                                placeholder="Quantidade"
                                value={produtoAtual.quantidade}
                                onChange={handleChange}
                            />
                            <input
                                name="codigoProduto"
                                placeholder="Código do Produto"
                                value={produtoAtual.codigoProduto}
                                onChange={handleChange}
                            />
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

    )
}