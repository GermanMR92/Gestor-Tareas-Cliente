import { REGISTER_SUCCESS, REGISTER_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT } from "../../types";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch(action.type) {

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token); // Establecemos el token en el localStorage
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }

        case LOG_OUT:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
               ...state,
               token: null,
               usuario: null,
               autenticado: false,
               mensaje: action.payload,
               cargando: false
            }
            
        case GET_USER:
            return {
               ...state,
               autenticado: true,
               usuario: action.payload,
               cargando: false
            }

        default:
            return state;
    }
}