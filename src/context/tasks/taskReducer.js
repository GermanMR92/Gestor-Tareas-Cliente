import { GET_TASKS_FROM_PROJECT, ADD_TASK, DELETE_TASK, CURRENT_TASK, UPDATE_TASK } from "../../types";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch (action.type) {

        case GET_TASKS_FROM_PROJECT: 
            return {
                ...state,
                proyectasks: action.payload
            }

        case ADD_TASK:
            return {
                ...state,
                proyectasks: [...state.proyectasks, action.payload],
                taskselected: null
            }

        case DELETE_TASK:
            return {
                ...state,
                proyectasks: state.proyectasks.filter(task => task._id !== action.payload),
                taskselected: null
            }

        case CURRENT_TASK:
            return {
                ...state,
                taskselected: action.payload // pasamos la tarea seleccionada
            }

        case UPDATE_TASK:
            return {
                ...state,
                proyectasks: state.proyectasks.map(task => task._id === action.payload._id ? action.payload : task),
                taskselected: null
            }

        default:
            return state;
    }
}