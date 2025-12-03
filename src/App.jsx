import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PaginaInicial from "./pages/PaginaInicial";
import CriarChamado from "./pages/CriarChamado";
import CriarChamadoUsuario from "./pages/CriarChamadoUsuario";
import MeusChamados from "./pages/MeusChamados";
import ChamadosGerais from "./pages/ChamadosGerais";
import Estoque from "./pages/Estoque";
import ConfiguracoesConta from "./pages/ConfiguracoesConta";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/DashboardAdmin";

// Componente para rotas privadas
function PrivateRoute({ children, perfilPermitido }) {
  const token = localStorage.getItem("token");
  const perfil = localStorage.getItem("perfil");

  if (!token) return <Navigate to="/login" />; // Não logado

  if (perfilPermitido && perfil !== perfilPermitido) {
    return <Navigate to="/pagina-inicial" />; // Sem permissão
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/pagina-inicial"
          element={
            <PrivateRoute>
              <PaginaInicial />
            </PrivateRoute>
          }
        />

        <Route
          path="/criar-chamado"
          element={
            <PrivateRoute>
              <CriarChamado />
            </PrivateRoute>
          }
        />

        <Route
          path="/criar-chamado-usuario"
          element={
            <PrivateRoute perfilPermitido="ADMIN">
              <CriarChamadoUsuario />
            </PrivateRoute>
          }
        />

        <Route
          path="/meus-chamados"
          element={
            <PrivateRoute>
              <MeusChamados />
            </PrivateRoute>
          }
        />

        <Route
          path="/chamados-gerais"
          element={
            <PrivateRoute perfilPermitido="ADMIN">
              <ChamadosGerais />
            </PrivateRoute>
          }
        />

        <Route
          path="/estoque"
          element={
            <PrivateRoute>
              <Estoque />
            </PrivateRoute>
          }
        />

        <Route
          path="/configuracoes-conta"
          element={
            <PrivateRoute>
              <ConfiguracoesConta />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard-admin"
          element={
            <PrivateRoute perfilPermitido="ADMINISTRADOR">
              <DashboardAdmin />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
