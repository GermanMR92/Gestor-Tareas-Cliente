/* El reducer es una función pura que toma el estado anterior y una acción, y devuelve en nuevo estado. Se llama reducer porque es el tipo de función que pasarías a Array. prototype.
   Aqui maparemos un conjunto de acciones que alteran el state de algo. 
*/

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECTS, CURRENT_PROJECT, DELETE_PROJECT, DISABLE_CURRENT_PROJECT } from '../../types';

export default (state, action) => {
    switch(action.type) {

        //Siempre debemos de coger una copia de nuestro State en cada CASE para luego realizar la accion sobre el 
        case PROJECT_FORM:
            return {
                ...state, 
                formulario: state.formulario ? false : true 
            }

        case GET_PROJECTS:
            return {
                ...state,                   // cogemos la copia de initialState y al array de projects
                projects: action.payload  // le introducimos lo que hay en payload.
            }
        
        case ADD_PROJECTS:
            return {
                ...state,
                projects: [...state.projects, action.payload], // cogemos el arary de initialState y le cargamos el proyecto que viene de newProject.js
                formulario: false // Ocultamos el formulario cuando introducimos un proyecto
            }
        
        // Comparamos el ID de los proyectos que estan en el array con la id que viene en el PAYLOAD y lo metemos en currentProject
        case CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projects.filter(project => project._id === action.payload)
            }

        case DISABLE_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: null
            }
        
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload), // Misma logica que CURRENT_PROJECT pero nos devuelve todos menos el que borramos
                currentProject: null
            }

        default:
            return state;
    }
}