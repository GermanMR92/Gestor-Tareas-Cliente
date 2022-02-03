import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import clienteAxios from '../../config/axios';
//Types
import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECTS, CURRENT_PROJECT, DELETE_PROJECT, DISABLE_CURRENT_PROJECT } from '../../types'; //No es necesario indicar el archivo de donde viene porque es un index


const ProjectState = props => {

    // 1: State inicial
    const initialState = {
        projects : [],
        formulario : false, // si es true se muestra el formulario para crear un nuevo proyecto
        currentProject : null // En esta propiedad se guardara el proyecto seleccionado
    };

    // 2: Extraemos el state y dispatch
    // Dispatch para ejecutar las acciones(types). useReducer es similar a useState
    const [state, dispatch] = useReducer(projectReducer, initialState)

    // Funciones para el CRUD de proyectos
    
    // showForm cambia a true el state de formulario para que se muestre al darle al boton de Nuevo Proyecto
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    // Se obtienen los proyectos para listarlos en el componentes de projectList.js 
    const getProjects = async () => {
        try {
            const resultado = await clienteAxios.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: resultado.data.projects
            })

        } catch (error) {
            console.log(error);
        }
    }

    // Agregar proyectos
    const addProject = async project => {
        try {
            const resultado = await clienteAxios.post('/api/projects', project);
            console.log(resultado);

            dispatch({
                type: ADD_PROJECTS,
                payload: resultado.data
            })

        } catch (error) {
            console.log(error);
        }
    }

    // Activa el proyecto al que se le haga click
    const currentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }
    const disableCurrentProject = () => {
        dispatch({
            type: DISABLE_CURRENT_PROJECT
        })
    }

    // Eliminar un proyecto
    const deleteProject = async projectId => {
        try {

            await clienteAxios.delete(`/api/projects/${projectId}`);
            
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        // 3: Mandamos los datos via Provider a app.js para que esten disponible en toda la app
        // Mandamos los datos/funciones que nacen aqui
        // nombreValor : valor
        <projectContext.Provider 
            value={{
                projects: state.projects,
                formulario: state.formulario,
                ActiveProject: state.currentProject,
                showForm,
                getProjects,
                addProject,
                currentProject,
                disableCurrentProject,
                deleteProject
            }}>
            {/* props.children permite pasar informacion a lo largo de componentes hijos */}
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;