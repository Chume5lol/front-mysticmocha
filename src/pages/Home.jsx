import { useAuth } from "../context/Context";
import React, { useState } from 'react';
import TopNavbar from '../components/TopNavbar';
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";

const Home = () => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>

                <Layout>
                    <h1>Bem-vindo, {user.nome}!</h1>

                    {user.role === "ADMINISTRADOR" && (
                        <div>
                            <h2>Seção do Administrador</h2>
                            <p>Aqui você pode ver tudo do sistema.</p>
                        </div>
                    )}

                    {user.role === "GESTOR" && (
                        <div>
                            <h2>Seção do Gestor</h2>
                            <p>Aqui você vê o dashboard de gestão.</p>
                        </div>
                    )}

                    {user.role === "PRESTADOR" && (
                        <div>
                            <h2>Seção do Prestador</h2>
                            <p>Aqui você pode criar chamados para usuários.</p>
                        </div>
                    )}

                    {user.role === "CLIENTE" && (
                        <div>
                            <h2>Seção do Cliente</h2>
                            <p>Aqui você vê e cria seus próprios chamados.</p>
                        </div>
                    )}
                </Layout>
        </>
    );
};

export default Home;
