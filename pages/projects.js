import React, { useState, useEffect } from 'react';
import styles from '../styles/projecs.module.css';

const Projects = () => {
  const loggedInUserId = '12345'; // Simulación del usuario logueado

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    attachments: [],
  });

  // Recuperar los proyectos de localStorage solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjects = localStorage.getItem(`projects_${loggedInUserId}`);
      setProjects(storedProjects ? JSON.parse(storedProjects) : []);
    }
  }, []);

  // Guardar los proyectos en localStorage cada vez que cambien
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`projects_${loggedInUserId}`, JSON.stringify(projects));
    }
  }, [projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProject((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const createProject = () => {
    if (newProject.title.trim() !== '') {
      const projectToAdd = {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        attachments: newProject.attachments.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        })),
      };

      setProjects([...projects, projectToAdd]);
      setNewProject({
        title: '',
        description: '',
        attachments: [],
      });
    }
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Project Manager</h1>
      </header>

      <section className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Nombre del Proyecto"
          value={newProject.title}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción del Proyecto"
          value={newProject.description}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="file"
          name="attachments"
          accept=".pdf,.xls,.xlsx,.doc,.docx,image/*"
          multiple
          onChange={handleFileChange}
          className={styles.input}
        />
        <button onClick={createProject} className={`${styles.btn} ${styles.btnCreate}`}>
          Crear Proyecto
        </button>
      </section>

      <section>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div>
              <h4>Archivos adjuntos:</h4>
              {project.attachments && project.attachments.length > 0 ? (
                <ul className={styles.attachmentsList}>
                  {project.attachments.map((file, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <a
                        href={file.url}
                        download={file.name}
                        className={styles.attachmentLink}
                      >
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay archivos adjuntos</p>
              )}
            </div>

            <button onClick={() => deleteProject(project.id)} className={`${styles.btn} ${styles.btnDelete}`}>
              Eliminar Proyecto
            </button>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        © 2025 Proyecto React
      </footer>
    </div>
  );
};

export default Projects;
