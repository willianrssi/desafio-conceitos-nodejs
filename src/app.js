const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;
  const index = repositories.findIndex((item) => item.id === id);
  if (index < 0) {
    response.status(400).json({ message: "Repository Not Found" });
  }
  repositories[index] = { ...repositories[index], title, url, techs };
  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((item) => item.id === id);
  if (index < 0) {
    response.status(400).json({ message: "Repository Not Found" });
  }
  repositories.splice(index, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((item) => item.id === id);
  if (index < 0) {
    response.status(400).json({ message: "Repository Not Found" });
  }
  repositories[index] = {
    ...repositories[index],
    likes: ++repositories[index].likes,
  };
  return response.json(repositories[index]);
});

module.exports = app;

