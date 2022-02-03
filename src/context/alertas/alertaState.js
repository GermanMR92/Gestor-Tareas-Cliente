import React, { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';
import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const AlertaState = props => {

    const initialState = {
        alerta: null
    }

    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    // Funcion mostrar alerta
    const showAlert = (msg, categoria) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
               msg,        // esto es lo mismo que msg: msg,
               categoria  // esto es lo mismo que categoria: categoria
            }
        });

        // la alerta se va a los 5 segundos
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000)
    }


    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                showAlert
            }}>
            {props.children}
        </alertaContext.Provider>
    )

}

export default AlertaState;