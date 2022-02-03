import React from 'react';
//Elementos necesarios para habilitar el routing en el proyecto
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/projects/Projects";
import RutaPrivada from './components/rutas/RutaPrivada';

// Context y Reducer. Recogemos los datos del projectState.js, TaskState.js y alertaState para compartirlos al resto de componentes
import ProjectState from "./context/projects/projectState";
import TaskState from './context/tasks/taskState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';

// Aqui estamos pasando el token por headers o lo eliminamos
import tokenAuth from './config/token';

// Revisamos que haya un token para pasarlo al header
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}


function App() {

  // Esta es la url que usaremos para conectarnos con el backend y esta 
  // escrita en la variable de entorno .env.development.local a la cual accedemos con process.env.NOMBREVARIABLE
  // La usamos en las peticiones POST y demas.
  //console.log(process.env.REACT_APP_BACKEND_URL); 

  return (
    <ProjectState>
      <TaskState>
        <AlertaState>
          <AuthState>
            <Router>
              <Routes>
                  {/* Ruta principal, el login */}
                  <Route path="/" element={<Login/>} />

                  {/* Ruta de crear cuenta */}
                  <Route path="/new-account" element={<NewAccount/>} />

                  {/* Ruta de los proyectos, hay que estar logeado */}
                  <Route path="/projects" element={<RutaPrivada> <Projects/> </RutaPrivada>} />
              </Routes>
            </Router>
          </AuthState>
        </AlertaState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
