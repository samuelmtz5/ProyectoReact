// pages/api/projects.js
export default async (req, res) => {
    if (req.method === 'POST') {
      // Lógica para crear un nuevo proyecto
    } else if (req.method === 'GET') {
      // Lógica para obtener proyectos
    } else {
      res.status(405).end(); // Método no permitido
    }
  };
  