import React, { useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
    
    const navigate = useNavigate();
   

    function handleCriarChamado() {
    navigate("/home/criarChamado");
  }

    return (
        <aside className={open ? "sidebar open" : "sidebar"} style={{
            width: open ? "20vw" : "60px",
            transition: "width 0.3s ease",
        }}>
            <div className="toggle-btn" onClick={() => setOpen(!open)}>
                {open ? "<<" : ">>"}
            </div>

            <ul className="sidebar-menu">
                <li onClick={handleCriarChamado}>Abrir chamado</li>
                <li>Meus chamados</li>

            </ul>
        </aside>
    );
}
