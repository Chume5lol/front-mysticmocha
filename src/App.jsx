import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Context";
import LoginPage from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home/admin" element={<Home />} />
          <Route path="/home/gestor" element={<Home />} />
          <Route path="/home/prestador" element={<Home />} />
          <Route path="/home/cliente" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
