import React, { useContext, useEffect } from 'react';
import Project from './project';
import projectContext from '../../context/projects/projectContext';

const ProjectList = () => {

    // Recogemos los proyectos del State projectState.js
    const projectsContext = useContext(projectContext);
    const { projects, getProjects } = projectsContext;

    // useEffect se ejecuta tan pronto como cargue el componente. Siempre es un arrowFunction
    // Nunca debe ir po debajo de un condicional.
    useEffect(() => {
        getProjects();
        //Esta linea comentada hace que se quite un error de la consola
        // eslint-disable-next-line 
    }, []);

    if(projects.length === 0) return null;

    return ( 

        <ul className="listado-proyectos">
            {projects.map(project => (
                <Project
                    key={project._id}
                    project={project}
                />
            ))}
        </ul>
    );
}
 
export default ProjectList;