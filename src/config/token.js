import clienteAxios from "./axios";

const tokenAuth = token => {
    if(token) {
        // Si existe un token se lo pasamos por headers a nuestro clienteAxios
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // Si el usuario se desconecta se eliminar del header
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;