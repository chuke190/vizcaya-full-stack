import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function RutaProtegida({ children }) {
    const location = useLocation();
    const { auth } = useContext(AuthContext);

    return auth ? children : <Navigate to="/" state={{ from: location }} />;
}

export default RutaProtegida;