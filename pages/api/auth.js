// pages/api/tasks.js
export default async (req, res) => {
    if (req.method === 'POST') {
      // Lógica para crear una nueva tarea
    } else if (req.method === 'GET') {
      // Lógica para obtener tareas
    } else {
      res.status(405).end(); // Método no permitido
    }
  };
  