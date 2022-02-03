import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';
import ProjectContext from '../../context/projects/projectContext';

const Task = ({task}) => {

    const projectsContext = useContext(ProjectContext);
    const { ActiveProject } = projectsContext; //Obtenemos el projectoSeleccionado

    const tasksContext = useContext(taskContext);
    const { deleteTask, getTasks, updateTask, saveCurrentTask } = tasksContext;

    const [currentProject] = ActiveProject // aplicamos destructuring. Otra opcion es ActiveProject[0]

    const onClick = taskId => {
        deleteTask(taskId, currentProject._id);
        getTasks(currentProject.id) // Tras borrar una tarea volvemos a cargar las tareas del proyecto actual/seleccionado
    }

    // esta funcion cambia el estado de la tarea
    // despues pasamos la tarea entera con el nuevo estado al State
    const changeTaskState = task => {
        if (task.estado) {
            task.estado = false;
        } else {
            task.estado = true;
        }

        updateTask(task);
    }

    return ( 
        <li className='tarea sombra'>
            <p>{task.nombre}</p>

            <div className='estado'>
                {task.estado
                ?
                    (<button type='button' className='completo' onClick={ () => changeTaskState(task)}>Completada</button>)
                :
                    (<button type='button' className='incompleto' onClick={ () => changeTaskState(task)}>Incompleta</button>)
                }
            </div>

            <div className="acciones">
                <button className="btn btn-primario" type='button' onClick={ () => saveCurrentTask(task) }>Editar</button>
                <button className="btn btn-secundario" type='button' onClick={ () => onClick(task._id) }>Eliminar</button>
            </div>
        </li>

        
    );
}
 
export default Task;