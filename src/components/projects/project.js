import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

    // Obtener el State del projectState.js
    const projectsContext = useContext(projectContext);
    const { currentProject } = projectsContext;

    // Obtener el State de taskContext.js
    const tasksContext = useContext(taskContext);
    const { getTasks } = tasksContext;

    // funcion que fija un proyecto
    const selectProyect = id => {
        currentProject(id); //Fijamos el proyecto actual
        getTasks(id); // Obtenemos las tareas de un proyecto
    }

    return ( 
        <li>
            <button type='button' className='btn btn-blank color-proyectos' onClick={ () => selectProyect(project._id) }>
                {project.nombre}
            </button>
        </li>
    );
}
 
export default Project;