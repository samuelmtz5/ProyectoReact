import React, { useState, useEffect } from 'react';
import styles from '../styles/task.module.css'; // Importando los estilos

const Tasks = () => {
  const loggedInUserId = '12345'; // Simulación del usuario logueado

  // Estado para las tareas
  const [tasks, setTasks] = useState([]);

  // Estado para el formulario
  const [taskForm, setTaskForm] = useState({
    id: null,
    name: '',
    description: '',
  });

  // Recuperar las tareas desde localStorage solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem(`tasks_${loggedInUserId}`);
      setTasks(storedTasks ? JSON.parse(storedTasks) : []);
    }
  }, []);

  // Guardar las tareas en localStorage cada vez que cambien
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`tasks_${loggedInUserId}`, JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const handleAddOrEditTask = () => {
    if (taskForm.id) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskForm.id
            ? { ...task, name: taskForm.name, description: taskForm.description }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(), // Genera un ID único
        name: taskForm.name,
        description: taskForm.description,
      };
      setTasks([...tasks, newTask]);
    }
    setTaskForm({ id: null, name: '', description: '' });
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setTaskForm(task);
  };

  return (
    <div className={styles.container}>
      <h1>Tareas</h1>

      {/* Formulario para añadir o editar tareas */}
      <div className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de la tarea"
          value={taskForm.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={taskForm.description}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button onClick={handleAddOrEditTask} className={styles.addButton}>
          {taskForm.id ? 'Guardar Cambios' : 'Añadir Tarea'}
        </button>
      </div>

      {/* Listado de tareas */}
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleEditTask(task)} className={styles.editButton}>
              Editar
            </button>
            <button onClick={() => handleDeleteTask(task.id)} className={styles.deleteButton}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
