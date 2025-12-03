import React from 'react';
import './TopNavbar.css';

export default function TopNavbar() {
  return (
    <nav className="top-navbar">
      <h1>MysticMocha</h1>
      <ul className="top-navbar-menu">
        <li>Home</li>
        <li>Sobre</li>
        <li>Contato</li>
      </ul>
    </nav>
  );
}
