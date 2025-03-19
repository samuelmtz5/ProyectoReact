// pages/api/projects/[id].js
export default async (req, res) => {
    const { id } = req.query;
  
    switch (req.method) {
      case "PUT": {

        const { name, description } = req.body;

        return res.status(200).json({ id, name, description, message: "Proyecto actualizado" });
      }
      case "DELETE": {

        return res.status(200).json({ message: "Proyecto eliminado" });
      }
      default: {
        res.setHeader("Allow", ["PUT", "DELETE"]);
        return res.status(405).end(`Método ${req.method} no permitido`);
      }
    }
  };
  