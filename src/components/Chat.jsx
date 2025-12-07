import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuth } from "../context/Context";

export default function Chat({ idChamado }) {
    const { user } = useAuth();
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState("");
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        if (!user?.token) return;

        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws-chat"),
            connectHeaders: { Authorization: `Bearer ${user.token}` },
            onConnect: () => {
                console.log("Conectado");
                client.subscribe(`/topic/chamado.${idChamado}`, (message) => {
                    const msg = JSON.parse(message.body);
                    setMensagens(prev => [...prev, msg]);
                });
            },
            onStompError: (frame) => console.error("STOMP Error:", frame)
        });

        client.activate();
        setStompClient(client);

        return () => client.deactivate();
    }, [idChamado, user]);

    const enviarMensagem = () => {
        if (!stompClient || !novaMensagem.trim()) return;

        const msgDTO = {
            idChamado,
            remetenteId: user.id,
            remetenteNome: user.nome,
            descricao: novaMensagem
        };

        stompClient.publish({
            destination: "/app/chat.send",
            body: JSON.stringify(msgDTO)
        });

        setNovaMensagem("");
    }

    return (
        <div>
            <div className="chat-mensagens">
                {mensagens.map((m, i) => (
                    <div key={i}>
                        <b>{m.remetenteNome}:</b> {m.descricao} <small>{new Date(m.dataEnvio).toLocaleTimeString()}</small>
                    </div>
                ))}
            </div>
            <input
                value={novaMensagem}
                onChange={e => setNovaMensagem(e.target.value)}
                placeholder="Digite uma mensagem"
            />
            <button onClick={enviarMensagem}>Enviar</button>
        </div>
    );
}
