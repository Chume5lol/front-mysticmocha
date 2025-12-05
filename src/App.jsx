import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/Context";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/Login";
import ProtectedLayout from "./components/ProtectedLayout";
import Home from "./pages/Home";
import CriarChamado from "./pages/CriarChamado";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          

          <Route element={<ProtectedLayout />}>

            <Route path="/" element={ <Home /> } />
            <Route path="/home/admin" element={<Home />} />
            <Route path="/home/gestor" element={<Home />} />
            <Route path="/home/prestador" element={<Home />} />
            <Route path="/home/cliente" element={<Home />} />
            <Route path="/home/criarChamado" element={<CriarChamado />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
