import { useAuth } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>; // não redireciona sem saber!
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
