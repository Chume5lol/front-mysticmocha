import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Context";

export default function ProtectedLayout() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // <- importante! renderiza as rotas filhas aqui
}
