import React, { useReducer } from "react";
import taskContext from "./taskContext";
import TaskReducer from "./taskReducer";
import clienteAxios from '../../config/axios';
import { GET_TASKS_FROM_PROJECT, ADD_TASK, DELETE_TASK, CURRENT_TASK, UPDATE_TASK } from '../../types';

const TaskState = props => {

    const initialState = {
        proyectasks : [], // Esta propiedad sera un array con las tareas de un proyecto en especifico
        taskselected : null, // Aqui almacenaremos la tarea que deseamos editar
    }

    // creamos dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Obtenemos las tareas de un proyecto
    const getTasks = async proyecto => {
    
        try {

            const resultado = await clienteAxios.get('/api/tasks', { params: { proyecto }}); // pasamos como parametro la id del proyecto
            //console.log(resultado);

            dispatch({
                type: GET_TASKS_FROM_PROJECT,
                payload: resultado.data.tasks
            })
            
        } catch (error) {
            console.log(error.message);
        }
    }

    // Agregar una tarea a un proyecto
    const addTask = async task => {
        try {

            const resultado = await clienteAxios.post('/api/tasks', task);
            console.log(resultado);

            dispatch({
                type: ADD_TASK,
                payload: resultado.data.task
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    //Eliminar una tarea
    const deleteTask = async (id, proyecto) =>{
        try {

            await clienteAxios.delete(`/api/tasks/${id}`, { params: { proyecto }});

            dispatch({
                type: DELETE_TASK,
                payload: id
            })
            
        } catch (error) {
            console.log(error);

        }
    }

    // modificar tarea
    const updateTask = async task => {
        try {

            const resultado = await clienteAxios.put(`/api/tasks/${task._id}`, task);
            console.log('Desde cliente: ');
            console.log(resultado.data.task);

            dispatch({
                type: UPDATE_TASK,
                payload: resultado.data.task
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    // seleccionamos una tarea para editarla
    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    return (
        <taskContext.Provider
            value={{
                proyectasks: state.proyectasks,
                taskselected: state.taskselected,
                getTasks,
                addTask,
                deleteTask,
                saveCurrentTask,
                updateTask
            }}>
            {props.children}
        </taskContext.Provider>
    )
}

export default TaskState;