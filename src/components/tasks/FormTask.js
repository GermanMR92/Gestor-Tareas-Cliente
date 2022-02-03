import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    // Obtener el currentProject del estate del projectState.js para ver si hay alguno activo
    const projectsContext = useContext(projectContext);
    const { ActiveProject } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { taskselected, addTask, getTasks, updateTask } = tasksContext;

    // effect detecta si cambia taskselected para cargarla en el state de este componente
    useEffect(() => {
        if (taskselected !== null) {
            saveTask(taskselected); /* guardamos el objeto de la tarea seleccionada en el state de este componente */

        } else {
            saveTask({nombre: ''})
        }
    }, [taskselected]); // aqui va lo que useEffect revisa para que cuando ocurra el cambio se ejecute el componente

    // State del formulario
    const [task, saveTask] = useState({
        nombre: ''
    });

    //Extraemos el nombre del proyecto
    const { nombre } = task;

    // Si no se ha seleccionado un proyecto no se renderiza el componente
    if (!ActiveProject) return null;

    // Obtenemos el proyecto actual ya que viene como un array
    const [currentProject] = ActiveProject;

    //Leemos los datos del formulario
    const readValues = e => {
        saveTask({
            ...task, [e.target.name] : e.target.value
        })
    }

    // Enviar el formulario
    const onSubmit = e => {
        e.preventDefault();

        // validamos la tarea
        if (nombre === '') return;

        //edicion o nueva tarea?
        if (taskselected == null) {
            // agregamos la nueva tarea al state
            task.proyecto = currentProject._id; // le pasamos la ID del proyecto para asignarsela
            addTask(task);

        } else {
            updateTask(task);
        }
        
        // Obtenemos nuevamente las tareas con la nueva incluida
        getTasks(currentProject.id)

        // reiniciamos form
        saveTask({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input type="text" name="nombre" className='input-text' placeholder='Tarea' onChange={readValues} value={nombre} />
                </div>

                <div className="contenedor-input">
                    <input type="submit" value={taskselected ? 'Editar tarea' : 'Añadir tarea'} className='btn btn-primario btn-submit btn-block' />
                </div>
            </form>
        </div>
    );
}
 
export default FormTask;