import { SHOW_ALERT, HIDE_ALERT } from "../../types";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch(action.type) {

        // No es necesario copiar el state porque UNICAMENTE tenemos la alerta
        case SHOW_ALERT:
            return {
                alerta: action.payload
            }

        case HIDE_ALERT:
            return {
                alerta: null
            }


        default:
            return state;
    }
}