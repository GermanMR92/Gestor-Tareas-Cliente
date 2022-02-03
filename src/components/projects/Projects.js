//VISTA DE LOS PROYECTOS
import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/bar';
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';
import AuthContext from '../../context/autenticacion/authContext';

const Projects = () => {

    // Extraemos la info de autenticacion para mantener al usuario activo
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="contenedor-app">
            <Sidebar />
            
            <div className="seccion-principal">
                
                <Bar />

                <main>

                    <FormTask />

                    <div className="contenedor-tareas">
                        <ListTasks />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Projects;