import { useAuth } from "../context/Context";

const Home = () => {
    const { user } = useAuth(); // pega o usuário logado do contexto

    if (!user) return <p>Carregando...</p>; // enquanto não tem usuário

    return (
        <div>
            <h1>Bem-vindo, {user.nome}!</h1>

            {/* Apenas Administrador */}
            {user.role === "ADMINISTRADOR" && (
                <div>
                    <h2>Seção do Administrador</h2>
                    <p>Aqui você pode ver tudo do sistema.</p>
                </div>
            )}

            {/* Apenas Gestor */}
            {user.role === "GESTOR" && (
                <div>
                    <h2>Seção do Gestor</h2>
                    <p>Aqui você vê o dashboard de gestão.</p>
                </div>
            )}

            {/* Apenas Prestador */}
            {user.role === "PRESTADOR" && (
                <div>
                    <h2>Seção do Prestador</h2>
                    <p>Aqui você pode criar chamados para usuários.</p>
                </div>
            )}

            {/* Apenas Cliente */}
            {user.role === "CLIENTE" && (
                <div>
                    <h2>Seção do Cliente</h2>
                    <p>Aqui você vê e cria seus próprios chamados.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
