import { useState } from "react";
import { useParams } from "react-router-dom";
import TaskService from "../services/service";

function Task() {
  const { id } = useParams();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const updateTask = () => {
    const data = { title, description };
    TaskService.update(id, data)
      .then((response) => {
        setMessage("Task actualizado exitosamente!");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <h4 className="font-bold text-xl mb-4">Editar Task</h4>

      <div className="mb-2">
        <label className="block font-medium">Titulo</label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="block font-medium">Descripcion</label>
        <input
          type="text"
          className="border border-gray-300 rounded w-full px-2 py-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        onClick={updateTask}
        className="bg-green-500 text-white px-3 py-1 rounded mt-2"
      >
        Actualizar
      </button>

      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
}

export default Task;
