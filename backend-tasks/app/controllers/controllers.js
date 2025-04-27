import TaskService from "../services/service.js";

// Create and Save a new Task
export const create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const task = TaskService.create(req.body);
  res.send(task);
};

// Retrieve all Tasks
export const findAll = (req, res) => {
  const title = req.query.title;
  const task = TaskService.findAll(title);
  res.send(task);
};


// Update a Task by ID
export const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedTask = TaskService.update(id, req.body);

  if (updatedTask) {
    res.send({ message: "Task was updated successfully." });
  } else {
    res.status(404).send({ message: `Cannot update Task with id=${id}.` });
  }
};