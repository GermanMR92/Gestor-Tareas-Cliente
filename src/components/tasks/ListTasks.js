//Componente encargado de listar todas las tareas.

import React, { useContext, Fragment } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const ListTasks = () => {

    // Obtener el State del projectState.js
    const projectsContext = useContext(projectContext);
    const { ActiveProject, deleteProject } = projectsContext; // Obtenemos un array con el proyecto actual para cargar sus tareas y titulo

    // Obtener el State del tasktState.js
    const tasksContext = useContext(TaskContext);
    const { proyectasks } = tasksContext; // proyectasks es un array unicamente con las tareas de un proyecto concreto

    // La primera vez que empezamos el programa no hay ningun proyecto seleccionado asi que cortamos la ejecucion del componente
    if (!ActiveProject) return <h2 className='titulo-seleccionaProyecto'>Selecciona un proyecto</h2>;

    // Aplicamos array destruncturing para extraer el proyecto actual ya que viene como un array
    const [currentProject] = ActiveProject;

    return ( 
        <Fragment>
            <h2 className='algunos-titulos'>Proyecto: {currentProject.nombre}</h2>

            
            <ul className="listado-tareas">
                {proyectasks.length === 0
                    ? 
                    (<li className='tarea'><p>No hay tareas</p></li>)
                    : 
                    proyectasks.map(task => ( /* Por cada tarea que haya se llamara al componente de Task.js y le pasamos el prop tarea */
                        <Task 
                        key={task.id}
                        task={task}/>
                    ))
                }
            </ul>

            <button type='button' className="btn btn-eliminar" onClick={ () => deleteProject(currentProject._id) }>Eliminar proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListTasks;