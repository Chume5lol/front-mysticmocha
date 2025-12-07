import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { useAuth } from "../context/Context"; // importa o contexto
import './ChamadoModal.css';

ReactModal.setAppElement('#root');

export default function ChamadoModal({ chamado, isOpen, onClose, atualizarChamados }) {
    const { user } = useAuth(); // pega o usuário logado
    const [status, setStatus] = useState(chamado.status || "");
    const [mensagens, setMensagens] = useState(chamado.chat?.mensagens || []);
    const [novaMensagem, setNovaMensagem] = useState("");

    useEffect(() => {
        if (!chamado || !user?.token) return;
        console.log(user.token)

        axios.get(`http://localhost:8080/chamados/${chamado.id}/mensagens`, {
                headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

            .then(res => setMensagens(res.data))
            .catch(err => console.error(err));
    }, [chamado, user]);

    useEffect(() => {
        if (!isOpen || !chamado || !user?.token) return;

        axios.get(`http://localhost:8080/chamados/${chamado.id}/mensagens`, {
                headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => setMensagens(res.data))
            .catch(err => console.error(err));
    }, [isOpen, chamado, user]);


    const handleAtualizarStatus = async () => {
        if (!user?.token) return;

        try {
            const response = await axios.put(
                `http://localhost:8080/chamados/${chamado.id}`,
                { ...chamado, status },
                { headers: { Authorization: `Bearer ${user.token}` } } // envia token
            );
            atualizarChamados(response.data);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar status do chamado");
        }
    };

    const handleEnviarMensagem = async () => {
        if (!novaMensagem.trim() || !user?.token) return;

        try {
            console.log(user.token)
            const response = await axios.post(
                `http://localhost:8080/chamados/${chamado.id}/chat`,
                { descricao: novaMensagem },
                { headers: { Authorization: `Bearer ${user.token}` } } // envia token
            );
            setMensagens(prev => [...prev, response.data]);
            setNovaMensagem("");
        } catch (err) {
            console.error(err);
            alert("Erro ao enviar mensagem");
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="react-modal-content"
            overlayClassName="react-modal-overlay"
        >
            <h2>{chamado.titulo}</h2>
            <p><b>Solicitante:</b> {chamado.solicitante.nome} {chamado.solicitante.sobrenome}</p>
            <p><b>Status atual:</b> {chamado.status}</p>

            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="AGUARDANDO_ATENDIMENTO">Aguardando atendimento</option>
                    <option value="EM_ANDAMENTO">Em andamento</option>
                    <option value="CONCLUIDO">Concluído</option>
                    <option value="CANCELADO">Cancelado</option>
                </select>
            </label>

            <button onClick={handleAtualizarStatus}>Atualizar Status</button>

            <div className="chat-container">
                <h3>Chat do Chamado</h3>
                <div className="chat-mensagens">
                    {mensagens.map((m, i) => (
                        <div key={i} className="chat-mensagem">
                            <b>{m.remetenteNome || m.usuario}:</b> {m.descricao}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                        placeholder="Digite uma mensagem..."
                    />
                    <button onClick={handleEnviarMensagem}>Enviar</button>
                </div>
            </div>

            <button onClick={onClose}>Fechar</button>
        </ReactModal>
    );
}
