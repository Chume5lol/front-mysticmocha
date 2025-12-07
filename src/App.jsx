import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/Context";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/Login";
import ProtectedLayout from "./components/ProtectedLayout";
import Home from "./pages/Home";
import CriarChamado from "./pages/CriarChamado";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MeusChamados from "./pages/MeusChamados"
import ChamadosGerais from "./pages/ChamadosGerais";

function App() {
  return (
    
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          

          <Route element={<ProtectedLayout />}>

            <Route path="/" element={ <Home /> } />
            <Route path="/home/admin" element={<Home />} />
            <Route path="/home/gestor" element={<Home />} />
            <Route path="/home/prestador" element={<Home />} />
            <Route path="/home/cliente" element={<Home />} />
            <Route path="/home/criarChamado" element={<CriarChamado />} />
            <Route path="/home/meusChamado" element={<MeusChamados />} />
            <Route path="/administrador/chamados" element={<ChamadosGerais />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
