// Los types son acciones que describen lo que va pasando en la aplicacion
// Se deben importar en los archivos State.js como por ejemplo, projectState.js

//types de proyectos
export const PROJECT_FORM = 'PROJECT_FORM'; // Mostramos el formulario al darle "new project"
export const GET_PROJECTS = 'GET_PROJECTS';
export const ADD_PROJECTS = 'ADD_PROJECTS';
export const CURRENT_PROJECT = 'CURRENT_PROJECT'; // Guardamos un proyecto cuando lo seleccionamos para carga su info
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DISABLE_CURRENT_PROJECT = 'DISABLE_CURRENT_PROJECT';

//types de tareas
export const GET_TASKS_FROM_PROJECT = 'GET_TASKS_FROM_PROJECT';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CURRENT_TASK = 'CURRENT_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

//types de registros de usuarios - alertas
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

//types de autenticacion
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const GET_USER = 'GET_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOG_OUT = 'LOG_OUT';