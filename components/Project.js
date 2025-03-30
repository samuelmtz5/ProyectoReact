// components/Project.js
import React, { useState } from 'react';

const Project = ({ project, onProjectUpdated, onProjectDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const [editedDescription, setEditedDescription] = useState(project.description);

  const handleUpdate = async () => {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editedName, description: editedDescription })
    });
    const data = await res.json();
    console.log(data);
    setIsEditing(false);
    onProjectUpdated(); // Se recarga la lista de proyectos en el componente padre
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de eliminar este proyecto?")) {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      console.log(data);
      onProjectDeleted(); // Se recarga la lista de proyectos en el componente padre
    }
  };

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="border p-1 w-full"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border p-1 w-full mt-2"
          />
          <div className="mt-2 space-x-2">
            <button onClick={handleUpdate} className="px-3 py-1 bg-green-500 text-white rounded">
              Guardar
            </button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-400 text-white rounded">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
          <p className="text-gray-600">{project.description}</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded">
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded">
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Project;
