/* La Context API de React es una forma de crear variables globales que podrás compartir fácilmente con otros componentes de tu aplicación. La alternativa consiste en pasar las propiedades de un componente padre a un componente hijo o nieto */
/* Consiste en pasar un STATE o FUNCION del componente principal a un componente directamente si pasar por todos los hijos. */
import { createContext } from 'react';

const ProjectContext = createContext();

export default ProjectContext;