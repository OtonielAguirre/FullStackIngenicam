import * as tasks from "../controllers/controllers.js";
import express from "express";

export default (app) => {
  let router = express.Router();

  router.post("/", tasks.create);
  router.get("/", tasks.findAll);
  router.put("/:id", tasks.update);

  app.use('/api/tasks', router);
};
