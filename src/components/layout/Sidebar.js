import React from 'react';
import NewProyect from '../projects/newProject';
import ProjectList from '../projects/projectsList';

const Sidebar = () => {
    return (
        <aside>
            <h1>Gestor<span>proyectos</span></h1>

            <NewProyect />
            
            <div className="proyectos">
                <h2>Proyectos</h2>

                <ProjectList />
            </div>
        </aside>
    );
}

export default Sidebar;