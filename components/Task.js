// components/Task.js
import React from 'react';

const Task = ({ task }) => (
  <div className="border p-4 rounded shadow-md bg-white">
    <h3 className="text-lg font-bold text-gray-800">{task.name}</h3>
    <p className="text-gray-600">{task.description}</p>
  </div>
);

export default Task;
