import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios"; //traemos al cliente con la URL que necesitamos para conectarnos al backend
import tokenAuth from '../../config/token'; // funcion que pasa por headers el token
import { REGISTER_SUCCESS, REGISTER_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT } from "../../types";

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'), // Le pasamos del localStorage el token
        autenticado: null, // sera true mientra su token este activo (1h)
        usuario: null,
        mensaje: null, // sera 'hay un usuario registrado' en caso de que lo haya
        cargando: true // Hasta que no sea false no entramos al componente. Lo usamos en RutaPrivada.js
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Registrar usuario
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/users', datos); // pasamos los datos a la API (clienteAxios tiene la URL del servidor)
            console.log(respuesta.data.token);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: respuesta.data // en la respuesta viene toda la info incluido el TOKEN
            });

            //Obtenemos el usuario
            usuarioAutenticado();
            
        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg, // aqui se encuentra el mensaje de que ya existe el usuario
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTER_ERROR,
                payload: alerta
            })
        }
    }

    // Retornar el usuario autenticado y lo almacenamos en la variable usuario del STATE
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            // fucion para enviar el token por header
            tokenAuth(token);
        }

        try {
            // Obtenemos el usuario en la respuesta
            const respuesta = await clienteAxios.get('/api/auth'); 
            //console.log(respuesta);

            dispatch({
                type: GET_USER, // cargamos al usuario en la variable usuario del state
                payload: respuesta.data.user //Pasamos al usuario en el payload
            });

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //Iniciar sesion
    const iniciarSesion = async datos => {
        try {
            
            const respuesta = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: respuesta.data
            });

            // Una vez inicia sescion obtenemos al usuario
            usuarioAutenticado();
            
        } catch (error) {

            console.log(error.response.data.msg); // en caso de que no exista o la contra no coincida el backend nos devuelve el msg de error
            
            const alerta = {
                msg: error.response.data.msg, // aqui se encuentra el mensaje de que ya existe el usuario
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
            
        }
    }

    // Cerrar sesion
    const cerrarSesion = () => {
        dispatch ({
            type: LOG_OUT
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado, // La enviamos para permite al usuario navegar, ya que si no esta autenticado no podra
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>

    )

}

export default AuthState;

