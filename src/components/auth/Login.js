//VISTA DEL LOGIN
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //Nos permite movernos entre rutas
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = () => {

    // extraer valores del context de alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, showAlert } = alertaContext;

    // extraer valores del context de auth
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // En caso de que el password o user no exista
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
    const [usuario, saveUser] = useState({
        email: '',
        password: ''
    })

    //Extraer de usuario
    const { email, password } = usuario;

    const onChange = e => {
        //Vamos guardando en el state segun vayamos escribiendo en el input
        saveUser({
            ...usuario, [e.target.name] : [e.target.value]
        })
    }

    //Cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //Validar que los campos no esten vacios
        if (email === '' || password === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error')
        }

        //Pasar al action
        iniciarSesion({email, password});
    }

    return (
        <div className="form-usuario">

            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }

            <div className="contenedor-form sombra-dark">
                <h1 className='algunos-titulos'>Iniciar sesión</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Contraseña" value={password} onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar sesión" />
                    </div>

                    
                </form>

                {/* Enlace a crear nueva cuenta | Link no recarga la pagina */}
                <Link to={'/new-account'} className='enlace-cuenta'>
                    Registrarse
                </Link>
            </div>
        </div>
    );
}

export default Login;