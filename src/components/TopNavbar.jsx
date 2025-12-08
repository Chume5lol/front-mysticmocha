import React from 'react';
import './TopNavbar.css';
import { useAuth } from '../context/Context';
import { useNavigate } from 'react-router-dom';

export default function TopNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  function handleLogout() {
    logout();
    navigate("/login");
  }
  if (!user) return (
    <nav>
      <span>Carregando...</span>
    </nav>
  );

  return (
    <nav className="top-navbar">
      <h1>MysticMocha</h1>
      <ul className="top-navbar-menu">
        <li>Alterar configuração</li>

        {(user.role === "CLIENTE" ||
          user.role === "PRESTADOR" ||
          user.role === "ADMINISTRADOR") && (
            <li onClick={handleLogout}>Logout</li>
          )}
      </ul>
    </nav>
  );
}
