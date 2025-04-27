let tasks = [];
let nextId = 1;

const create = (data) => {
  const task = {
    id: nextId++,
    title: data.title,
    description: data.description,
    published: data.published ?? false
  };
  tasks.push(task);
  return task;
};

const findAll = (filterTitle) => {
  if (filterTitle) {
    return tasks.filter(tut => 
      tut.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
  }
  return tasks;
};

const update = (id, data) => {
  const index = tasks.findIndex(tut => tut.id === id);
  if (index === -1) return null;
  
  tasks[index] = { ...tasks[index], ...data };
  return tasks[index];
};

export default {
  create,
  findAll,
  update,
  
};
