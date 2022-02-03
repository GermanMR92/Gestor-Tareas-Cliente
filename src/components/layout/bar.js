import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import ProjectContext from '../../context/projects/projectContext';

const Bar = () => {

    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    const projectContext = useContext(ProjectContext);
    const { disableCurrentProject } = projectContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    const onClick = () => {
        disableCurrentProject()
        cerrarSesion();
    }

    return ( 
        <header className='app-header'>
            {usuario ? 
                <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
            : null}

            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-sesion" onClick={ () => onClick()  }>Cerrar sesión</button>
            </nav>
        </header>
    );
}
 
export default Bar;