import React, { useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";

export default function Sidebar({ open, setOpen }) {
    const { user } = useAuth();
    const navigate = useNavigate();
   

    function handleCriarChamado() {
        navigate("/home/criarChamado");
    }
    function handleChamadoGerais() {
        navigate("/administrador/chamados")
    }

    return (
        <aside className={open ? "sidebar open" : "sidebar"} style={{
            width: open ? "9vw" : "50px",
            transition: "width 0.3s ease",
        }}>
            <div className="toggle-btn" onClick={() => setOpen(!open)}>
                {open ? "<<" : ">>"}
            </div>

            <ul className="sidebar-menu">
                <li onClick={handleCriarChamado}>Abrir chamado</li>
                <li>Meus chamados</li>
                {user.role === "ADMINISTRADOR" && (
                        <li onClick={handleChamadoGerais}>Chamados gerais</li>
                    )}


            </ul>
        </aside>
    );
}
