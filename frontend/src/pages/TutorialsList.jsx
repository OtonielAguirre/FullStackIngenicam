import { useState, useEffect } from "react";
import TaskService from "../services/service";

function TasksList() {
  const [Tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveTasks();
  }, []);

  const retrieveTasks = () => {
    TaskService.getAll()
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTasks();
    setCurrentTask(null);
    setCurrentIndex(-1);
  };

  const setActiveTask = (Task, index) => {
    setCurrentTask(Task);
    setCurrentIndex(index);
  };

  const togglePublished = (Task) => {
    const updatedStatus = !Task.published;
    const data = { ...Task, published: updatedStatus };

    TaskService.update(Task.id, data)
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* LEFT COLUMN: SEARCH + LIST */}
      <div className="flex-1">
        <h4 className="font-bold text-lg mb-2">Task List</h4>
        <ul className="divide-y divide-gray-200 border border-gray-200 rounded">
          {Tasks &&
            Tasks.map((Task, index) => (
              <li
                className={
                  "flex items-center justify-between px-4 py-2 " +
                  (index === currentIndex ? "bg-blue-100" : "")
                }
                key={index}
              >
                <div
                  onClick={() => setActiveTask(Task, index)}
                  className="cursor-pointer flex-1"
                >
                  {/* Show strikethrough if published */}
                  <span className={Task.published ? "line-through text-gray-400" : ""}>
                    {Task.title}
                  </span>
                </div>

                <button
                  onClick={() => togglePublished(Task)}
                  className={`ml-4 px-3 py-1 rounded text-white ${
                    Task.published ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  {Task.published ? "Mark as pending" : "Mark as completed"}
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* RIGHT COLUMN: DETAILS */}
      <div className="flex-1">
        {currentTask ? (
          <div className="p-4 bg-white rounded shadow">
            <h4 className="font-bold text-xl mb-2">Task</h4>
            <div className="mb-2">
              <strong>ID: </strong>
              {currentTask.id}
            </div>
            <div className="mb-2">
              <strong>Title: </strong>
              {currentTask.title}
            </div>
            <div className="mb-2">
              <strong>Status: </strong>
              {currentTask.published ? "Completed" : "Pending"}
            </div>

          </div>
        ) : (
          <div>
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksList;
