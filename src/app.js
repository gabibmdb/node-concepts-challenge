const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


//LIST
app.get("/repositories", (request, response) => {
  
  return response.status(200).json(repositories);

});

//CREATE
app.post("/repositories", (request, response) => {
  
  const { title,  url, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(200).json(repository);

});

//UPDATE
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.findIndex(repository => repository.id === id);

  if (repository < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[repository] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repository].likes
  }

  return response.json(repositories[repository]);

});

//DELETE
app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repository = repositories.findIndex(repository => repository.id === id);

  if (repository < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repository, 1);

  return response.status(204).send({ message: 'The repository was successfully deleted'});

});

//CREATE Like
app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;

  const repository = repositories.findIndex(repository => repository.id === id);

  if (repository < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[repository].likes++;

  return response.json(repositories[repository]);

});

module.exports = app;
