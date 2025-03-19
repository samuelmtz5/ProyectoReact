// pages/api/projects.js
export default async (req, res) => {
    if (req.method === 'POST') {
      // Lógica para crear un nuevo proyecto
      const { name, description } = req.body;
      // Aquí agregarías la lógica para guardar el proyecto en la base de datos
      res.status(201).json({ message: 'Proyecto creado' });
    } else if (req.method === 'GET') {
      // Lógica para obtener proyectos
      const projects = [
        { id: 1, name: 'Proyecto 1', description: 'Descripción del Proyecto 1' },
        { id: 2, name: 'Proyecto 2', description: 'Descripción del Proyecto 2' },
      ];
      res.status(200).json(projects);
    } else {
      res.status(405).end(); // Método no permitido
    }
  };
  