//VISTA DE CREAR CUENTA
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //Nos permite movernos entre rutas
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NewAccount= () => {

    // extraer valores del context de alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, showAlert } = alertaContext;

    // extraer valores del context de auth
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // en caso de que el usuario se haya autenticado
    let navigate = useNavigate(); // Aqui tenemos un historial de los enlaces de nuestra app
    useEffect(() => {
        if(autenticado) {
            navigate('/projects'); //lo mandamos a proyectos
        }

        if(mensaje) { //si se registra un usuario repetido vendra un mensaje del backend y se mostrara
            showAlert(mensaje.msg, mensaje.categoria); 
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, navigate]); //Si cambia a true la variable autenticado 
                                        //Redirigimos al usuario a /projects ya que tenemos acceso a Routing via props

    //State para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    //Extraer de usuario con destructuring
    const { nombre, email, password, confirmar } = usuario;

    const onChange = e => {
        //Vamos guardando en el state
        guardarUsuario({
            ...usuario, [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //Validar que los campos no esten vacios
        if (nombre.trim() === '' ||  email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            console.log(nombre);
            showAlert('Todos los campos son obligatorios', 'alerta-error'); 
            return; 
        }

        //password minimo de 4 caracteres
        if (password.length < 4) {
            console.log(password);
            showAlert('La contraseña debe tener al menos 4 caracteres', 'alerta-error');
            return;
        }

        //Password iguales?
        if (password !== confirmar) {
            showAlert('Las contraseñas no son iguales', 'alerta-error');
            return;
        }

        //Pasar al action
        registrarUsuario({nombre, email, password});
    }

    return (
        <div className="form-usuario">

            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }

            <div className="contenedor-form sombra-dark">
                <h1 className='algunos-titulos'>Nueva cuenta</h1>

                <form onSubmit={onSubmit}>

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Nombre" value={nombre} onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Contraseña" value={password} onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <input type="password" id="confirmar" name="confirmar" placeholder="Contraseña" value={confirmar} onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarse" />
                    </div>

                    
                </form>

                {/* Enlace a crear nueva cuenta | Link no recarga la pagina */}
                <Link to={'/'} className='enlace-cuenta'>
                    Iniciar sesión
                </Link>
            </div>
            
        </div>
    );
}

export default NewAccount;