import { useState } from "react";
import axios from "axios";
import api from "../services/api";

export default function Login() {
    const [mensagem, setMensagem] = useState("");
    const [nickname, setNickname] = useState("");
    const [senha, setSenha] = useState("");


    async function handleLogin(nickname, senha) {
        try {
            const response = await api.post("/auth/login", { nickname, senha });
            const { token, usuario } = response.data;
            console.log(response.data)
            localStorage.setItem("token", token);
            localStorage.setItem("perfil", usuario.perfil);
            
            // redireciona para o dashboard dependendo do perfil
            if (usuario.perfil === "ADMINISTRADOR") {
                window.location.href = "/dashboard-admin";
            } else {
                window.location.href = "/dashboard";
            }
        } catch (err) {
            
            console.log(localStorage.getItem("perfil"))
            console.error(err);
            alert(err);
        }
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>MysticMocha</h1>
            <form
                style={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(nickname, senha);
                }}
            >
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Entrar
                </button>
            </form>

            {mensagem && <p style={styles.message}>{mensagem}</p>}
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#121212",
        color: "#fff",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
    },
    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        fontSize: "1rem",
    },
    button: {
        backgroundColor: "#6a0dad",
        color: "#fff",
        border: "none",
        padding: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    message: {
        marginTop: "20px",
        color: "#0f0",
        fontWeight: "bold",
    },
};
