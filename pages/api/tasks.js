// pages/api/tasks.js
export default async (req, res) => {
    if (req.method === 'POST') {
      // Lógica para crear una nueva tarea
      const { name, description } = req.body;
      // Aquí agregarías la lógica para guardar la tarea en la base de datos
      res.status(201).json({ message: 'Tarea creada' });
    } else if (req.method === 'GET') {
      // Lógica para obtener tareas
      const tasks = [
        { id: 1, name: 'Prueba de tarea 1', description: 'Estas solamente son pruebas de tareas obj estatico' },
        { id: 2, name: 'Tarea 2', description: 'Descripción de la Tarea 2' },
        { id: 3, name: 'Tarea 3', description: 'Prueba 3' },
      ];
      res.status(200).json(tasks);
    } else {
      res.status(405).end(); // Método no permitido
    }
  };
  