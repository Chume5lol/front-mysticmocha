import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                nickname: username,
                senha: password,
            });

            let usuarioData = response.data.usuario;
            if (usuarioData.value) usuarioData = usuarioData.value; // se Optional, pega o valor real

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("perfil", usuarioData.role);

            login(usuarioData);

            console.log("Usuário logado:", usuarioData);
            console.log("Role:", usuarioData.role);

            switch (usuarioData.role) {
                case "ADMINISTRADOR":
                    navigate("/home/admin");
                    break;
                case "GESTOR":
                    navigate("/home/gestor");
                    break;
                case "PRESTADOR":
                    navigate("/home/prestador");
                    break;
                case "CLIENTE":
                default:
                    navigate("/home/cliente");
                    break;
            }

        } catch (err) {
            console.error(err);
            setErro(err.response?.data?.message || "Erro ao fazer login");
        }
    };


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            gap: "10px"
        }}>
            <h1>Login</h1>

            <input
                placeholder="Usuário"
                style={{ padding: "8px", width: "250px" }}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Senha"
                type="password"
                style={{ padding: "8px", width: "250px" }}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button style={{ padding: "8px 16px" }} onClick={handleLogin}>
                Entrar
            </button>

            {erro && <p style={{ color: "red" }}>{erro}</p>}
        </div>

    );
};

export default LoginPage;
