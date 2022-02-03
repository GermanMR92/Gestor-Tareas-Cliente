
// Este componente hara que podamos acceder a otros SOLO
// si estamos autenticados

import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

// Este componente toma otro componente, y si el usuario esta autenticado en la app
// lo dejamos pasar, sino lo mandamos al '/'
const RutaPrivada = ({ children }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return (!autenticado && !cargando ? <Navigate to="/" /> : children)
}
 
export default RutaPrivada;