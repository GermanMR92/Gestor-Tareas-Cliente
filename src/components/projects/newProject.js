//Con fragment podemos tener mas de un elemento en la misma altura en el return, por ejemplo, button y form
import React, { Fragment, useState, useContext } from 'react';
//Importamos el context para obtener el state del formulario
import projectContext from '../../context/projects/projectContext';

const NewProyect = () => {

    /* Con useContext podemos recoger todas las funciones y estados de projectState.js 
    sin pasarlo por todo el arbol de componentes y sin props. Obtenemos el State del formulario y la funcion que muestra el formulario */
    const projectsContext = useContext(projectContext);
    const { formulario, showForm, addProject } = projectsContext //como estamos enviando el estado desde projectState.js lo recogemos con destructuring

    //State del proyecto 
    // 1 -> Creamos el objeto con los datos del formulario
    const [project, saveProject] = useState({
        nombre : ''
    });

    //Aplicamos destructuring para obtener el/los datos del objeto
    const { nombre } = project;
    
    /* 2-> Al llamar a la funcion (en el input) se coge una copia del objeto para ir rellenandolo
    e.target.name es el name del input que cuyo valor debe coincidir con la propiedad del objeto que, en este caso es "nombre"
    Y a esta propiedad le indicamos que su valor es el value del input que es lo que escribe el usuario */
    const onChangeProject = e => {
        saveProject({
            ...project, [e.target.name] : e.target.value
        })
    }

    // 3-> Cuando el usuario envia el formulario
    const onSubmitProject = e => {
        e.preventDefault();

        //Validamos el/los datos
        if ( nombre === '') { return; }

        //Agregamos al State
        addProject(project);

        //Reiniciamos el formulario
        saveProject ({
            nombre: ''
        });

    }

    return ( 
       <Fragment>
            <button type="button" className="btn btn-block btn-form" onClick={ ()=> showForm() }>Nuevo proyecto</button>

            {/* Si el state del formulario es true se mostrará */}
            { formulario
                ?
                    (
                        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProject}>
                            <input type="text" className="input-text" placeholder="Nombre proyecto" name="nombre" value={nombre} onChange={onChangeProject}/>

                            <input type="submit" className="btn btn-form btn-block" value="Añadir proyecto"/>
                        </form>
                    )
                :
                    null      
            }
        </Fragment>
    );
}

export default NewProyect;